ng build --target production --base-href http://88.99.175.85/pretraga/ --aot
scp dist/* 88.99.175.85:/var/www/html/pretraga
  
  
  ng build --target production --base-href /pretraga/ --deploy ssh://88.99.175.85/var/www/html/pretraga

mjovanov@MJOVANOV-G0SNN MINGW64 ~/src/angular4/pretraga (master)
$ scp -pr dist/ 88.99.175.85:src/pretraga
The authenticity of host '88.99.175.85 (88.99.175.85)' can't be established.
ECDSA key fingerprint is SHA256:J8+w+7eRzOtMKFsbzPyHKKIhd5oKEapl2gBQRayZvaM.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '88.99.175.85' (ECDSA) to the list of known hosts.
mjovanov@88.99.175.85's password:
favicon.ico                                                                                                                                                                                                100% 5430   178.0KB/s   00:00
index.html                                                                                                                                                                                                 100%  611    22.5KB/s   00:00
inline.bundle.js                                                                                                                                                                                           100% 5761   201.7KB/s   00:00
inline.bundle.map                                                                                                                                                                                          100% 5824   210.9KB/s   00:00
main.bundle.js                                                                                                                                                                                             100%   24KB 870.5KB/s   00:00
main.bundle.map                                                                                                                                                                                            100%   20KB 759.2KB/s   00:00
polyfills.bundle.js                                                                                                                                                                                        100%  252KB   3.5MB/s   00:00
polyfills.bundle.map                                                                                                                                                                                       100%  314KB   5.5MB/s   00:00
styles.bundle.js                                                                                                                                                                                           100% 9996   361.2KB/s   00:00
styles.bundle.map                                                                                                                                                                                          100%   13KB 448.5KB/s   00:00
vendor.bundle.js                                                                                                                                                                                           100% 3177KB   7.8MB/s   00:00
vendor.bundle.map           


ON server: 
mv -f /home/mjovanov/src/pretraga/dist/* /var/www/html/

