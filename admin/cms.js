(function () {
  if (!window.CMS || !window.React) return;

  const e = window.React.createElement;

  CMS.registerPreviewTemplate("events", function (props) {
    const entry = props.entry;

    const title = entry.getIn(["data", "title"]) || "Event title";
    const date = entry.getIn(["data", "date"]) || "";
    const time = entry.getIn(["data", "time"]) || "";
    const address = entry.getIn(["data", "address"]) || "";
    const description = entry.getIn(["data", "description"]) || "";
    const category = entry.getIn(["data", "category"]) || "";
    const image = entry.getIn(["data", "image"]) || "";

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