# todos

There are many "sample todo apps", but this one's mine. Project goals:

* _full-stack_: not just a frontend, but also a backend API, with persistence
* _from scratch_: while I Googled how to configure and fix the various tools I use, I didn't use
a template for the app nor its build process
* _reactive_: the frontend live-updates in response to changes made by other clients (see clip below)

Non-goals:

* _breadth of functionality_: I went deep on the stack rather than wide on the frontend; you can
  only add and complete tasks, not delete them, reorder them, etc.
* _visual design_: I don't consider myself a designer.
* _production readiness_: while the code is reasonably clean as well as linted, and tries to
  encapsulate best practices (like loading dependencies from a CDN) where straightforward, in many
  places it's not documented nor tested and edge cases are left unhandled. I've left todos (no pun
  intended) and suggested fixes in many of those places.

These goals were chosen to demonstrate mastery across the stack, from the build process, to the
frontend, to the backend, and even features of advanced distributed systems like reactivity. They
also let me showcase technologies that I developed for my last job, Mixmax, across the stack.

## Technologies used

_* indicates a technology that I originated at Mixmax._

The frontend is written in ES modules and bundled using Rollup. The frontend uses React for the view
layer and Backbone for the model layer. The choice of Backbone dates in part from [Mixmax history],
though it continues to be an excellent fit for REST APIs as well as for the reactivity stack, using
[`backbone-publication*`], and even integrates with React hooks via [`use-backbone*`].

The backend is in Node, with persistence via Mongo. [`publication-server*`] provides the backend for
reactivity. In this non-production setup, the web/API server and the "publication" server share the
same process. In production, I would likely factor them into separate processes that communicated
via something like Redis pubsub.

The build process uses Gulp to coordinate Rollup, the web/API/publication server, and the database
server. I'm proud to say that I've configured livereload across the stack so that the frontend will
rebuild, and the server restart, given changes to any dependencies whether front-end or backend JS
or assets&mdash;an aspect of developer experience often overlooked.

Given even a slightly more complicated microservices development environment, I would suggest
having a process manager like Supervisor launch Gulp and Mongo separately. This would then let
developers easily stop/start/restart the processes, and toggle between logs, using a UI like
[`custody*`].

## Installing

Your system must have [Homebrew] installed as well as a recent version of Node(tested using
v12.16.1).

`npm install` will install the Node dependencies as well as Mongo 4.2 via Homebrew.

## Running

`npm start` will launch the web/API/publication server as well as Mongo. Then open
http://localhost:3000 in your browser. Your todo list will have been seeded with some sample tasks;
feel free to add and complete as many as you like.

To witness reactivity in action, open http://localhost:3000 in a second tab alongside the first
and add or complete a task.

## Reading the code

Entry points:

* _build process_: `gulpfile.js`
* _frontend_: `src/client/main.jsx`
* _backend_: `app.js`

[Mixmax history]: https://engineering.mixmax.com/blog/backbone-to-react-without-rewriting
[`backbone-publication*`]: https://github.com/mixmaxhq/backbone-publication
[`use-backbone*`]: https://glitch.com/~use-backbone
[`publication-server*`]: https://github.com/mixmaxhq/publication-server
[`custody*`]: https://github.com/mixmaxhq/custody
[Homebrew]: https://brew.sh/
