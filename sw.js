self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'POST' || !['share-audio','share-media'].some(p => url.href === new URL(p,self.registration.scope).href)) return;
  e.respondWith((async () => {
    try {
      const form = await e.request.formData();
      const file = form.get('media') || form.get('audio');
      if (!(file instanceof File) || !file.size) throw new Error('Empty file');
      const id = crypto.randomUUID();
      const cache = await caches.open('true-detector-shares-v1');
      const key = new URL('shared/'+id,self.registration.scope);
      await cache.put(key.href,new Response(file,{headers:{'Content-Type':file.type || 'application/octet-stream','X-File-Name':encodeURIComponent(file.name)}}));
      return Response.redirect(new URL('index.html?shared='+id,self.registration.scope).href,303);
    } catch (error) {
      return Response.redirect(new URL('index.html?shareError=1',self.registration.scope).href,303);
    }
  })());
});
