---
title: 文章内容从Sanity.io中迁移——博客的心路历程
date: 2023-04-24 13:58:00
updateDate: 2023-04-25 14:00:00
tags: [Blog]
excerpt: 文章内容从Sanity.io迁移回到了文件系统，简单来聊聊个人博客的过程中所走过的路程，这个博客是怎么一步步变成这样的，我又在中间学到了什么。
---

在大约不知道多少个版本之前~~大约还是用Next.js的版本~~我文章的内容从`local file`迁移到了`Sanity.io`这个CMS上。

`Sanity.io`其实非常棒，但是为什么如今又迁移回来了呢，这里我想聊聊一个博客开发的心路历程

## Hexo 静态站点

从搭建博客的一开始我就没有选择`Wordpress`这样的传统网页构建方式，一是要有服务器这挺麻烦的，还容易被攻击，二是更喜欢极客一点的方式，就选择了静态生成的博客。

其实翻看过去的文章能发现，一开始是使用`Hexo`的,~~其实这一时期还有一部分更早期的文章丢失了😥~~。其实`Hexo`作为一个静态博客程序可以说是非常完美了，基本该有的功能都有还有非常好的社区环境。

但是问题在于对于我，一个开发者来说，`Hexo`的架构基本由是传统的模板+CSS+JavaScript构成的，在我步入社会开始打工后，这样的架构就算是折腾起来学习到的也已经不是市场的需求了。开发网页从传统的模板语法+CSS+JavaScript逐渐被`Vue`,`React`这样的框架代替，特别是`Vue`这样又新又老的体验，在国内确实是非常受欢迎。

于是博客走向了以`React`为基础的静态生成框架搭建。至于为什么不是`Vue`，首先是当时基于`Vue`的一些博客程序实在算不上好用，而且我在工作中主要接触的就是`Vue`实在提不起兴趣在业余也使用`Vue`了

> 注: 现在看来使用如 Nuxt.js、Vitepress 搭建博客已经非常不错了，完全可以作为一个选项

## 拥抱 React

### 了不起的盖茨比

最开始呢，是接触到了`Gatsby`，这也是比较老牌的一个网站开发框架了，用来开发静态的博客可以说是杀鸡用牛刀了，不过当时的源代码并没有保存下来也是比较遗憾，算是我掌握`React`后第一个实践的项目。

但是经过一段时间的使用我感觉`Gatsby`的厚重程度实在对于一个小博客是过于重了<sup>[相关文章](/blog/rebuild-my-blog)</sup>，当时是github仓库收到了奇奇怪怪的依赖警告，所以后面就换到了`Next.js`

但是使用`Gatsby`给我带来了一个新的知识就是`Graphql`，对于博客内的数据（文章之类的）全是通过`Graphql`的方式去查询，算是拓展了当时基本就接触过`Restful`,`JSONrpc`的视野，这部分体验还可以。

### Who is Next?

兜兜转转来到了`React`生态的王——`Next.js`，这家伙可厉害了作为基于`React`的框架，也提供了`SSG`的能力，其实对于`SSG\SSR\CSR`这部分概念也是接触了`Gatsby`之后才了解到的。

博客也是在这个时期来到了`Vercel`上，之前的时间都是基于`Github Page`，也浅浅的试用了`Github`提供的`Github Action`来给自己的博客简单持续集成。

作为`React`生态圈的顶流，`Next.js`可以说没什么缺点，这一部分的[博客源码](https://github.com/enpitsuLin/enpitsuLin.xyz/tree/legacy)，可以看到后期已经从本地markdown文件来到了`Sanity.io`托管内容的形式，想在使用远程内容的同时又有完整的`MDX`体验也是费了一部分劲。之间还有一段时间是想用`Notion`来做CMS，但是效果不好就来到了`Sanity.io`

在这段时期，基于使用`React`的技能提升，也渐渐觉得`React`确实存在一些心智负担，还有`Next.js`本身架构的不合理性，基于单文件的页面系统让人逐渐混淆了Nodejs环境和Web环境，~~Next.js 13带来了[App Router](https://beta.nextjs.org/docs)一定程度上解决了这个问题，可喜可贺可喜可贺~~

于是乎后来短暂来到了`vite-plugin-ssr`。

### 天下武功唯快不破

在使用`Next.js`的这段时间，`Vite`横空出世，很馋啊，因为`webpack`确实是好慢，而且开发插件什么的好麻烦。于是心一狠转到了使用`vite-plugin-ssr`搭建博客。

说实话一开始确实感觉挺麻烦，原来一个ssr框架在背后默默为开发者做了辣么多。~~他真的我哭死~~

于是花了一点时间使用`vite-plugin-ssr`复原了`Next.js`的博客，其实体验也算是不错的，DX和UX个人觉得都是一流，但是后面遇到了`astro`

## 宇航时代

随着前端的发展，越来越多的让人眼花缭乱的框架，`remix\Qwik\astro`这些带来了孤岛架构的框架据说是牛逼哄哄的。

我也随着潮流就来到了`astro`，其实早在`astro`大约还没1.0的时候就已经接触过了，但是最后在`astro@2.0.0`发布的时间节点才正式将博客迁移到`astro`

`astro`给我的感觉就是返璞归真，就和直接写`HTML+CSS+JavaScript`的体验很相似，很大一部分功能我都是通过写原生 JavaScript 来实现，但它带来的开发体验又是非常现代化的，基于`Vite`，完善的`TypeScript`支持，这又给我带来了又新又旧的感觉。

而且基于各个UI框架的集成，可以将Vue，Solid，React都给加上，感觉也确实挺厉害，我觉得`astro`对于之前使用的各个方案都可以是说薄纱，无论DX还是UX方面。

而且这段时间我也了解到了`Solid`并作为UI框架加入到了博客中，在响应式实现方面没有`React`那样的心智负担，而且我确实觉得编译在前端这个领域已经不可或缺了，牺牲一小部分的DX，带来性能提升什么其实也挺好。

但我确实对`memo`,`useCallback`搞不太明白，毕竟我的工作中不太能接触`React`，业余学习还是选个确实没那么难的吧😥。~~或许该找个写React的公司~~

## 对于文章内容的迁移

其实还是因为远程markdown内容没办法有完善的MDX体验，~~或者我选择牺牲运行时0JS~~，而且`astro`对于内容的集成确实体验好不少。

而且我基于`Sanity.io`的话我写文章工作流就比较复杂，而且作为极客一点的方案，基于git也不算很糟，接下来就让文章在`push/pull`跟着仓库到处走吧。


## 迈向 Web3

其实就在最近接触到了[xLog](https://xlog.app), 作为链上博客我很推荐如果有写作需求的朋友来尝试作为自己步入 Web3 的第一款应用，特别是不太会鼓捣博客这方面的。

其实抛弃那些有关 Web 3 噶韭菜的理论，区块链技术确实是我觉得的开放自由的互联网最原始的形态，去中心化，没有审查，基于共识

虽然同样也会充斥人性带来满满的恶意，但对于想要怎么一种环境和单纯需要一个不会被审查的写作平台的人可能会有吸引力。
