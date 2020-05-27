# Realtime Collaborative Markdown Editor

## What is this?

Type your markdown into the box on the left and immediately see if on the box on the right. If you send a friend a link to this URL you both can edit the document at the same time!


### How to use this?

Type anything after the slash in the domain and to create a new page and link to your colleagues to participate. You can also start typing away if you're simply using it by yourself.


### Local Development

**Local Redis server setup**
```bash
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
```
**Start redis server**
```bash
cd src
./redis-server
```
**Start NodeJS server**
```bash
node server.js
```

### How was this built?

This website uses the following to work:

 - [Showdown](https://github.com/showdownjs/showdown) - Converts markdown text to beautiful HTML
 - [ShareJS](http://sharejs.org/) - Allows for realtime editing
 - [Node.js](https://nodejs.org/) - Backend framework 
 - [Redis](http://redis.io/) - In-memory database for storage
 - [Twitter Bootstrap](http://getbootstrap.com/) - Makes everything a little prettier
