<template>
	<div className="flex flex-col items-center justify-center h-screen">
		<div className="text-center">
			<h1 className="text-6xl font-bold">404</h1>
			<h2 className="text-3xl">Page Not Found</h2>
			<p className="mt-8">
				<router-link
					:to="{ name: 'BirdsPage' }"
					className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600"
				>
					Back to Home
				</router-link>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ErrorPage'
}
</script>
