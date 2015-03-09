var epaCore = {
	takeYear : function (b) {
		var a = b.getYear();
		var c = a % 100;
		c += (c < 38) ? 2000 : 1900;
		return c
	},
	postPopUp : function (b, a, d) {
		var c = window.open(b, a, d)
	}
};
window._gaq = [["_setAccount", "UA-32633028-1"], ["_trackPageview"], ["_trackPageLoadTime"], ["_setDomainName", "epa.gov"]];
(function (e, a) {
		var c = e.createElement(a),
		b = e.getElementsByTagName(a)[0];
		c.src = "https://www.google-analytics.com/ga.js";
		b.parentNode.insertBefore(c, b)
	}
	(document, "script"));
jQuery(document).ready(function () {
		var g = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i,
		a = "";
		if (jQuery("base").attr("href") != undefined) {
			a = jQuery("base").attr("href")
		}
		jQuery("#content a").each(function () {
				var d = jQuery(this).attr("href");
				if (d && (d.match(/^https?\:/i)) && (!d.match(document.domain))) {
					jQuery(this).click(function () {
							var f = d.replace(/^https?\:\/\//i, "");
							_gaq.push(["_trackEvent", "External", "Link Click", f]);
							if (jQuery(this).attr("target") != undefined && jQuery(this).attr("target").toLowerCase() != "_blank") {
								setTimeout(function () {
										location.href = d
									}, 200);
								return false
							}
						})
				} else {
					if (d && d.match(/^mailto\:/i)) {
						jQuery(this).click(function () {
								var f = d.replace(/^mailto\:/i, "");
								_gaq.push(["_trackEvent", "Email", "Link Click", f])
							})
					} else {
						if (d && d.match(g)) {
							jQuery(this).click(function () {
									var r = (/[.]/.exec(d)) ? /[^.]+$/.exec(d) : undefined;
									var f = d;
									_gaq.push(["_trackEvent", "Download", r + " Click", f]);
									if (jQuery(this).attr("target") != undefined && jQuery(this).attr("target").toLowerCase() != "_blank") {
										setTimeout(function () {
												location.href = a + d
											}, 200);
										return false
									}
								})
						}
					}
				}
			});
		var n = document.createElement("script");
		n.async;
		n.src = "http://www.epa.gov/epahome/notice.js";
		var q = document.getElementsByTagName("script")[0];
		q.parentNode.insertBefore(n, q);
		var i = document.createElement("script");
		i.async;
		i.src = "http://www.epa.gov/epafiles/js/third-party/foresee/foresee-trigger.js";
		q.parentNode.insertBefore(i, q);
		var m = jQuery("#searchbox");
		if (m[0]) {
			m.autocomplete("/autocomplete", {
					minChars : 2,
					delay : 200,
					matchSubset : false,
					selectFirst : false
				}).result(function (d, r, f) {
					jQuery("#EPAsearch").submit()
				})
		}
		var p = jQuery("table.zebra tr:even");
		if (p[0]) {
			p.addClass("tint")
		}
		if (document.lastModified == "") {
			var k = new Date()
		} else {
			var k = new Date(document.lastModified)
		}
		var h = document.createElement("p");
		h.id = "date";
		h.appendChild(document.createTextNode("Last updated on " + k.toLocaleDateString()));
		var j = document.getElementById("footer");
		j.appendChild(h);
		var e = document.createElement("p");
		e.id = "url";
		e.appendChild(document.createTextNode(window.location.href));
		j.appendChild(e);
		var o = new Date();
		var l = new Date(o.toGMTString());
		var b = (Date.UTC(epaCore.takeYear(l), l.getMonth(), l.getDate(), 0, 0, 0)) / 86400000;
		$("ins").each(function (s) {
				var f = $(this).attr("datetime");
				var d = f.split("-");
				var r = (Date.UTC(d[0], d[1], d[2], 0, 0, 0)) / 86400000;
				var t = r - (b + 1);
				if (t < 31 && t > 0) {
					$(this).prepend("<img src='http://www.epa.gov/epafiles/images/new-en.gif' alt='New!' width='34' height='16'/>")
				}
			});
		jQuery("#content").append('<ul id="share"><li><a href="#area">Share</a></li></ul>');
		var c = '<ul><li class="facebook"><a href="#area" title="facebook">Facebook</a></li><li class="reddit"><a href="#area" title="reddit">reddit</a></li><li class="twitter"><a href="#area" title="twitter">Twitter</a></li><li class="whatisthis"><a href="#area" title="whatisthis">What is this?</a></li></ul>';
		jQuery("#share li").append(c).hover(function () {
				jQuery(this).addClass("on")
			}, function () {
				jQuery(this).removeClass("on")
			});
		jQuery("#share li ul li a").click(function () {
				var f = jQuery(this).attr("title");
				var d = encodeURIComponent(window.location.href);
				var r = encodeURIComponent(document.title);
				switch (f) {
				case "facebook":
					epaCore.postPopUp("http://www.facebook.com/sharer.php?u=" + d + "&t=" + r, "facebook", "height=436,width=646,scrollbars=yes,resizable=yes");
					break;
				case "reddit":
					epaCore.postPopUp("http://www.reddit.com/submit?url=" + d, "reddit", "height=450,width=650,scrollbars=yes,resizable=yes");
					break;
				case "twitter":
					epaCore.postPopUp("https://twitter.com/share?text=" + r + "&url=" + d + "&via=EPAgov&count=none&lang=en", "twitter", "height=375,width=550,scrollbars=yes,resizable=yes");
					break;
				case "whatisthis":
					window.location = "http://www.epa.gov/epahome/bookmarks.html";
					break
				}
			})
	});
 
