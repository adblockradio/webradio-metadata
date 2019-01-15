pkg index.js --out-path builds/
cd builds/
mv index-linux webradio-metadata-linux
sha256sum webradio-metadata-linux > webradio-metadata-linux.sha256sum
mv index-macos webradio-metadata-macos
sha256sum webradio-metadata-macos > webradio-metadata-macos.sha256sum
mv index-win.exe webradio-metadata-win.exe
sha256sum webradio-metadata-win.exe > webradio-metadata-win.exe.sha256sum
scp webradio-metadata-* abr10:/home/alexandre/site/public/metadata/.
