## Overview

Corkboard is a single page React app that aims to facilitate resource-sharing
between friends on specific subjects. Users create boards on a subject where
they can chat and share resources in a bulletin board format. Users can
collaborate on these bulletin boards by creating and organizing sticky notes
with text and/or links. Bulletin boards can be organized in any way a user likes
by dragging and dropping the notes around the board.

## Technology

Corkboard uses React and Redux for the front-end app. Though it's a single page
application, the routes are simulated with React Router. The back-end JSON API
is written with Ruby on Rails and uses Postgres for the database. The repository
for the back-end can be found here:
https://github.com/nickpaolino/corkboard_api. Each board has a real-time chat
that uses Action Cable to create a web-socket with the Rails server.

## Functionality

When a user logs in or signs up, they are taken to the user home page. This is a
bulletin board that represents all of the boards that a user is part of. These
boards are visualized as sticky notes that can be re-arranged in any way the
user wants. When the user wants to create a board, they click the + button in
the lower left hand corner and a form modal appears.

When creating a board, the user chooses a subject and a list of the users they
want to be included. After creation, the user is directed to the newly created
board. All users in a board always have the option of inviting more users to a
board at any time.

On the board show page, there are two main features. There is a real-time chat
on the left side that allows users to communicate with each other on this
specific board. On the right side, there is a bulletin board where users can
create and organize sticky notes relevant to the board's subject. A sticky note
has text and can be linkable. All users have permission to reorganize the board
in whichever way they prefer. All changes to the notes' positions are saved
immediately.

The main goal of the functionality is to organize and focus resource-sharing and
discussion between users. The bulletin board visualization is designed to keep a
clear record of links shared between groups of friends on particular subjects.

## Bulletin Board Implementation

The drag-and-drop bulletin board was implemented using the React Draggable
library. The draggable note components respond to the parent div as a boundary.
A note's position and content is persisted to the database every time it is
moved or the content is changed. Although all the note components are
re-rendered on update, only the note that has had any change to position or
content is updated in the database. The board is optimistically rendered on
every change and only fetches when a note is added, deleted, or the board is
changed. These factors make the bulletin board functionality efficient and quick
to use.

## Redux

I used Redux for state management throughout the app. The redux store manages
the user authentication process along with all of the communication with the
JSON API. In order to execute async dispatches for fetch requests, I used the
Redux-Thunk library to await promises before updating state.

## Layout / Design

The layout and design was created using Semantic's UI React library. I used
their component templates for the modals, navbar, forms, buttons, inputs, and
icons. For the bulletin board feature, I created the majority of the CSS from
scratch.
