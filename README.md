# Chatroom

![Screenshot](https://raw.githubusercontent.com/czyzykowski/chatroom/master/docs/screenshot.png)

## Description

An example project combining [Ruby on Rails][1] as a backend server, [React][2]
as a UI layer in the browser, [Webpack][3] as a JavaScript build tool, and
finally [Faye][4] for real time communication with the server which enables
chat functionality.

The API (the very little of it there is) is build using [Jbuilder][5] gem.

UI part is build on React. Whole application state is stored in [redux][6]. For
AJAX requests small [axios][7] library is definitely enough. [Ramda][8] serves
as a Swiss army knife for any small JavaScript manipulation.

Giphy integration enabled by amazingly simple [giphy][9] gem.

## Installation & Running

Traditionally install all gems

    $ bundle install

And then also all the required npm packages (for react & friends)

    $ npm install

When all of that is finished, there's db migration to be run (by default it
uses sqlite3 database)

    $ bin/rake db:migrate

Optionally you can load seed data (some example messages) by running

    $ bin/rake db:seed

And finally you could run the project

    $ foreman start -f Procfile.dev

This starts two processes: rails server and webpack in watch mode, so that any
changes to the JavaScript files will get immediately picked up and reflected in
the compiled bundle.

Open http://localhost:3000 and poke around.

## Giphy integration

When chatting, you can add a gif from giphy by typing

    /giphy words used for search

The server will search giphy and return first result found.

## Polish, polish, polish...

- connecting screen when faye is creating web socket,
- connection status indicator,
- caching messages in local storage to make sure they are sent via faye,
- automatically sync emojis between clients,
- move list of users from in-memory to redis,
- user list is lost when disconnected,
- add tests to react components,
- add tests to the backend


[1]: http://rubyonrails.org/
[2]: https://facebook.github.io/react/
[3]: https://webpack.github.io/
[4]: http://faye.jcoglan.com/
[5]: https://github.com/rails/jbuilder
[6]: http://rackt.org/redux/index.html
[7]: https://github.com/mzabriskie/axios
[8]: http://ramdajs.com/
[9]: https://github.com/sebasoga/giphy
