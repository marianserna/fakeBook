# Hola! 

Welcome to one of the most rewarding and challenging projects I've worked on! 🙏

This project was built using React and Firebase. It was supposed to be a very simple project to try to understand how [Heed](#http://heed.agency/) built the [Young Creatives](#http://youngcreatives.heed.agency/) experience, particularly the infinite grid...It turned out not to be so simple. 

The grid presented several challenges, better yet... the grid itself was a humongous challenge. Additionally, the fact that I was having CORS issues when an image different from the user's Facebook profile was posted (-user can upload another image-) was so freaking annoying. I tried a couple suggested solutions but ended up having to build an express server and proxy to pretend that all images were being loaded from the same server and avoid this issue. Very frustrating.

Another thing I realized is that sometimes one forgets that there are simple solutions to simple problems. For example, I was trying to figure out how to greyscale all images in the grid by using a complex script when this could totally be done with CSS. duh 🤣. I used one of [Una Kravets'](#https://una.im/CSSgram/) filters to do so.

Along with the grid, I wanted to try adding some random filters. With help I created a couple of -super random- custom filters and used a CSS one by [Una Kravets](#https://una.im/CSSgram/) and the breathing halftone filter by [David Desandro](#https://github.com/desandro/breathing-halftone). The intention was just gaining some pratice with them.

Initially I thought about having a real time component and this is why I used Firebase but when the app turned into a monster I realized it was too much for a simple practice project and I sort of regretted not using a normal relational db which would have been much more efficient.

Libraries/Packages used other than the already mentioned ones:
+ GSAP ❤️
+ Mo.js ❤️❤️ 
+ Howler.js
+ Hammer.js
+ reactstrap
+ rebase

xoxo!

