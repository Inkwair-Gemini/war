<script>
	import { page } from '$app/stores';
	import './style.css';
</script>

<svelte:head>
	<title>朝鲜战争</title>
</svelte:head>

<header>
	<img src="/logo.png" alt="Logo" class="logo" />
	<h1>朝鲜战争</h1>
	<nav>
		<ul>
			<li><a class:active={$page.url.pathname === '/'} href="/">基本介绍</a></li>
			<li><a class:active={$page.url.pathname === '/video'} href="/video">视频介绍</a></li>
			<li><a class:active={$page.url.pathname === '/comments'} href="/comments">留言板</a></li>
			<li><a class:active={$page.url.pathname === '/contact'} href="/contact">联系我们</a></li>
		</ul>
	</nav>
</header>

<main>
	<slot/>
</main>

<footer>
	<p>版权所有 &copy; 2024 朝鲜战争</p>
</footer>
