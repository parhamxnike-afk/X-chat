
self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "پیام جدید", body: "یک پیام جدید داری." };
  }

  const title = data.title || "پیام جدید در X Chat";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "یک پیام جدید دریافت کردی.",
      icon: "/icon.png",
      badge: "/icon.png",
      data: { url: data.url || "/" }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = new URL(
    event.notification.data?.url || "/",
    self.location.origin
  ).href;

  event.waitUntil(
    clients.openWindow(url)
  );
});
