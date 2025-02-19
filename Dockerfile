FROM nginx
ARG DAP_ENV='dev'
ENV DAP_ENV=${DAP_ENV}
# dist* means that the next line will succeed whether or not a dist directory exists.
COPY test_site dist* /usr/share/nginx/html/
COPY nginx-test.conf.template /etc/nginx/conf.d/
RUN envsubst '${DAP_ENV}' < /etc/nginx/conf.d/nginx-test.conf.template > /etc/nginx/conf.d/default.conf
