(function () {
  if (!window.CMS || !window.React) return;

  const e = window.React.createElement;

  CMS.registerPreviewTemplate("site_content", function (props) {
    const entry = props.entry;
    const data = entry.get("data");

    // Cuando el archivo es data/events.json, los eventos viven en data.items
    const items = data && data.get("items");

    if (!items || !items.size) {
      return e(
        "div",
        {
          style: {
            fontFamily: "Arial, sans-serif",
            background: "#0b0d0b",
            color: "#f4efe6",
            padding: "24px",
            minHeight: "100vh"
          }
        },
        e("h2", null, "No events yet")
      );
    }

    const first = items.get(0);

    const title = first.get("title") || "Event title";
    const date = first.get("date") || "";
    const time = first.get("time") || "";
    const address = first.get("address") || "";
    const description = first.get("description") || "";
    const category = first.get("category") || "";
    const image = first.get("image") || "";

    return e(
      "div",
      {
        style: {
          fontFamily: "Arial, sans-serif",
          background: "#0b0d0b",
          color: "#f4efe6",
          padding: "20px",
          minHeight: "100vh"
        }
      },
      image
        ? e("img", {
            src: image,
            alt: title,
            style: {
              width: "100%",
              maxWidth: "720px",
              height: "260px",
              objectFit: "cover",
              display: "block",
              marginBottom: "20px"
            }
          })
        : null,
      e(
        "div",
        {
          style: {
            background: "#111",
            padding: "20px",
            maxWidth: "720px",
            border: "1px solid rgba(244,239,230,.12)"
          }
        },
        e(
          "div",
          {
            style: {
              background: "#d4a017",
              color: "#111",
              display: "inline-block",
              padding: "6px 10px",
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "12px",
              textTransform: "uppercase"
            }
          },
          category
        ),
        e(
          "h2",
          {
            style: {
              margin: "0 0 10px 0",
              fontSize: "28px"
            }
          },
          title
        ),
        e(
          "p",
          {
            style: {
              color: "#d4a017",
              margin: "0 0 8px 0"
            }
          },
          `${date}${time ? " · " + time : ""}`
        ),
        e(
          "p",
          {
            style: {
              color: "#d4a017",
              margin: "0 0 12px 0"
            }
          },
          address
        ),
        e(
          "p",
          {
            style: {
              lineHeight: "1.5"
            }
          },
          description
        )
      )
    );
  });
})();