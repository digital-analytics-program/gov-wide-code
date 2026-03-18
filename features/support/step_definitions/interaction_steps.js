import { When } from "@cucumber/cucumber";

When("I click on a file to download it", async function () {
  await this.page.locator('#internalDownload').click();
});

When("I highlight and press Enter on a file to download it", async function () {
  await this.page.focus('#internalDownload');
  await this.page.keyboard.press('Enter');
});

When("I click on element with selector {string}", async function (elementSelector) {
  await this.page.locator(elementSelector).click();
});

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

async function clickElement(page, element) {
  await page.evaluate((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
    }, { once: true });

    element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    element.click();
  }, element);
}

async function getSectionByHeading(page, sectionHeading) {
  return page.evaluateHandle((sectionHeading) => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.find((candidate) => {
      const heading = candidate.querySelector('h2');
      return heading && heading.textContent.replace(/\s+/g, ' ').trim() === sectionHeading;
    });
  }, sectionHeading);
}

async function clickElementInExample(page, sectionHeading, exampleHeading, selector, index = 0) {
  await page.evaluate(({ sectionHeading, exampleHeading, selector, index }) => {
    const normalizedText = (text) => text.replace(/\s+/g, ' ').trim();
    const sections = Array.from(document.querySelectorAll('section'));
    const section = sections.find((candidate) => {
      const heading = candidate.querySelector('h2');
      return heading && normalizedText(heading.textContent) === sectionHeading;
    });

    if (!section) {
      throw new Error(`Section not found: ${sectionHeading}`);
    }

    const columns = Array.from(section.querySelectorAll('.column'));
    const column = columns.find((candidate) => {
      const heading = candidate.querySelector('h4');
      return heading && normalizedText(heading.textContent) === exampleHeading;
    });

    if (!column) {
      throw new Error(`Example not found: ${exampleHeading}`);
    }

    const elements = Array.from(column.querySelectorAll(selector));
    const element = elements[index];

    if (!element) {
      throw new Error(`Element not found for selector "${selector}" at index ${index}`);
    }

    // Keep the page in place so assertions can inspect the dataLayer after inline handlers run.
    element.addEventListener('click', (event) => {
      event.preventDefault();
    }, { once: true });

    element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    element.click();
  }, { sectionHeading, exampleHeading, selector, index });
}

async function clickMatchingElementInSection(page, sectionHeading, selector, matcherText, index = 0) {
  await page.evaluate(({ sectionHeading, selector, matcherText, index }) => {
    const normalizedText = (text) => text.replace(/\s+/g, ' ').trim();
    const sections = Array.from(document.querySelectorAll('section'));
    const section = sections.find((candidate) => {
      const heading = candidate.querySelector('h2');
      return heading && normalizedText(heading.textContent) === sectionHeading;
    });

    if (!section) {
      throw new Error(`Section not found: ${sectionHeading}`);
    }

    const elements = Array.from(section.querySelectorAll(selector))
      .filter((element) => normalizedText(element.textContent) === matcherText);
    const element = elements[index];

    if (!element) {
      throw new Error(`Element with text "${matcherText}" not found in section "${sectionHeading}"`);
    }

    element.addEventListener('click', (event) => {
      event.preventDefault();
    }, { once: true });

    element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    element.click();
  }, { sectionHeading, selector, matcherText, index });
}

When("I click the submit button in the {string} example of the {string} section", async function (exampleHeading, sectionHeading) {
  await clickElementInExample(this.page, sectionHeading, exampleHeading, 'input[type="submit"]');
});

When("I click link {int} in the {string} example of the {string} section", async function (linkNumber, exampleHeading, sectionHeading) {
  await clickElementInExample(this.page, sectionHeading, exampleHeading, 'a', linkNumber - 1);
});

When("I click link {int} with text {string} in the {string} section", async function (linkNumber, linkText, sectionHeading) {
  await clickMatchingElementInSection(this.page, sectionHeading, 'a', linkText, linkNumber - 1);
});

When("I click button {int} with text {string} in the {string} section", async function (buttonNumber, buttonText, sectionHeading) {
  await clickMatchingElementInSection(this.page, sectionHeading, 'button', buttonText, buttonNumber - 1);
});

When("I call gas with invalid arguments", async function () {
  await this.page.evaluate(() => {
    window.gas();
  });
});

When("I call gas4 {string} with parameters", async function (eventName, table) {
  await this.page.evaluate(({ eventName, parameters }) => {
    window.gas4(eventName, parameters);
  }, { eventName, parameters: table.rowsHash() });
});

When("I call gas4 {string} with an empty parameter object", async function (eventName) {
  await this.page.evaluate((eventName) => {
    window.gas4(eventName, {});
  }, eventName);
});

When("I call gas4 with malformed arguments", async function () {
  await this.page.evaluate(() => {
    window.gas4('share');
  });
});

When("I add an external share link to the page", async function () {
  await this.page.evaluate(() => {
    const wrapper = document.querySelector('#newLinkWrapper');
    wrapper.innerHTML = `
      <a
        id="dynamicShareLink"
        class="a2a_button_facebook"
        href="https://www.addtoany.com/add_to/facebook?linkurl=https%3A%2F%2Fwww.gsa.gov%2Ftravelpolicy&linkname=Travel%20Policy"
      >
        Share travel policy
      </a>
    `;
  });
});

When("I click the injected link with selector {string}", async function (selector) {
  const handle = await this.page.$(selector);
  if (!handle) {
    throw new Error(`Injected element not found for selector: ${selector}`);
  }
  await clickElement(this.page, handle);
});
