tsc static/wrapper.ts
uglifyjs static/wrapper.js > static/gtm_wrapper.min.js

console.aws -> s3 -> rokt-master-files-us -> store/js

misc:
http-server -S -C cert.pem -p 80

SSL cert:
mkcert 127.0.0.1 "\*.rokt.localhost"
