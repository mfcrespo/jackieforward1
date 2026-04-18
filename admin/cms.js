CMS.registerPreviewStyle("/admin/preview.css");

const h = window.createElement;

const EventPreview = createClass({
  render() {
    const entry = this.props.entry;

    const title = entry.getIn(["data", "title"]) || "Event title";
    const date = entry.getIn(["data", "date"]) || "2026-04-21";
    const time = entry.getIn(["data", "time"]) || "3:00 PM – 4:00 PM";
    const address = entry.getIn(["data", "address"]) || "Event address";
    const description = entry.getIn(["data", "description"]) || "Event description";
    const category = entry.getIn(["data", "category"]) || "meet-greet";
    const image = entry.getIn(["data", "image"]);
    const rsvp = entry.getIn(["data", "rsvp"]);

    return h("div", { className: "cms-event-preview" }, [
      image
        ? h("img", { className: "cms-event-preview-image", src: image })
        : null,

      h("div", { className: "cms-event-preview-body" }, [
        h("div", { className: "cms-event-preview-category" }, category),
        h("h2", {}, title),
        h("p", { className: "cms-event-preview-meta" }, `${date} · ${time}`),
        h("p", { className: "cms-event-preview-meta" }, address),
        h("p", {}, description),

        rsvp
          ? h("a", { className: "cms-event-preview-btn", href: "#" }, "RSVP")
          : null
      ])
    ]);
  }
});

CMS.registerPreviewTemplate("events", EventPreview);