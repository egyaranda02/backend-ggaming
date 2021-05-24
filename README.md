# Back End GGeming

Projek ini dibangun dengan menggunakan NodeJS sebagai server dari aplikasi GGeming

Untuk dataset sudah kita sediakan pada folder dataset dengan nama file `dataset.ttl`

## Cara Penggunaan Backend

- Jalankan fuseki server dengan command dibawah pada folder fuseki server di cmd/terminal

  Pada sistem operasi Windows :
  ```cmd
  fuseki-server
  ```


- Jena Fuseki dapat diakses di
  
  ```link
  http://localhost:3030
  ```

- Tambahkan `dataset` dengan nama `ggeming`
- Upload data `dataset.ttl` ada pada folder `dataset` di repository
- Kemudian buka cmd/terminal lain atau tab baru pada terminal, tanpa menutup cmd/terminal fuseki server.
- Kita perlu menginstall dependency package agar server dapat berjalan dengan menjalankan command berikut 
  
  ```cmd
  npm install
  ```
  
- Jalankan REST API Server dengan command berikut
  
  ```cmd
  node app
  ```

## Kelompok

- Muhamad Fahrul Azimi (140810180027)
- Ahmad Egy Aranda (140810180043)

Link github Front-end
 https://github.com/fahrulazimi/ggeming
