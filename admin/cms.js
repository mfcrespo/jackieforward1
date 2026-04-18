(function () {
  if (!window.CMS) return;

  const h = window.createElement;

  const EventPreview = createClass({
    render: function () {
      const entry = this.props.entry;

      const title = entry.getIn(["data", "title"]) || "Event title";
      const date = entry.getIn(["data", "date"]) || "2026-04-21";
      const time = entry.getIn(["data", "time"]) || "3:00 PM - 4:00 PM";
      const address = entry.getIn(["data", "address"]) || "Event address";
      const description = entry.getIn(["data", "description"]) || "Event description";
      const category = entry.getIn(["data", "category"]) || "Category";
      const rsvp = entry.getIn(["data", "rsvp"]) || "";
      const image = entry.getIn(["data", "image"]) || "";

      return h("div", {
        style: {
          fontFamily: "Arial, sans-serif",
          background: "#0b0d0b",
          color: "#f4efe6",
          padding: "24px",
          minHeight: "100vh"
        }
      }, [
        image
          ? h("img", {
              src: image,
              alt: title,
              style: {
                width: "100%",
                maxWidth: "720px",
                height: "280px",
                objectFit: "cover",
                display: "block",
                marginBottom: "20px"
              }
            })
          : null,

        h("div", {
          style: {
            maxWidth: "720px",
            border: "1px solid rgba(244,239,230,.12)",
            background: "#111",
            padding: "24px"
          }
        }, [
          h("div", {
            style: {
              display: "inline-block",
              padding: "6px 10px",
              background: "#d4a017",
              color: "#111",
              fontWeight: "700",
              fontSize: "12px",
              textTransform: "uppercase",
              marginBottom: "14px"
            }
          }, category),

          h("h2", {
            style: {
              margin: "0 0 12px 0",
              fontSize: "32px",
              lineHeight: "1.1"
            }
          }, title),

          h("p", {
            style: {
              color: "#d4a017",
              margin: "0 0 8px 0",
              fontWeight: "700"
            }
          }, `${date} · ${time}`),

          h("p", {
            style: {
              color: "#d4a017",
              margin: "0 0 14px 0"
            }
          }, address),

          h("p", {
            style: {
              margin: "0 0 16px 0",
              lineHeight: "1.6"
            }
          }, description),

          rsvp
            ? h("a", {
                href: "#",
                style: {
                  display: "inline-block",
                  padding: "12px 18px",
                  background: "#d4a017",
                  color: "#111",
                  textDecoration: "none",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }
              }, "RSVP")
            : null
        ])
      ]);
    }
  });

  CMS.registerPreviewTemplate("events", EventPreview);
})();