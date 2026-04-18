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
    const featured = entry.getIn(["data", "featured"]) || false;

    return e(
      "div",
      {
        style: {
          fontFamily: "Arial, sans-serif",
          background: "#050806",
          color: "#f4efe6",
          minHeight: "100vh",
          padding: "24px"
        }
      },
      e(
        "div",
        {
          style: {
            maxWidth: "760px",
            margin: "0 auto",
            border: featured
              ? "1px solid rgba(212,160,23,.55)"
              : "1px solid rgba(244,239,230,.10)",
            background: "#0d110d",
            boxShadow: "0 10px 30px rgba(0,0,0,.25)"
          }
        },

        image
          ? e("img", {
              src: image,
              alt: title,
              style: {
                width: "100%",
                height: "280px",
                objectFit: "cover",
                display: "block"
              }
            })
          : null,

        e(
          "div",
          {
            style: {
              padding: "24px"
            }
          },

          e(
            "div",
            {
              style: {
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "14px"
              }
            },
            e(
              "span",
              {
                style: {
                  display: "inline-block",
                  background: "#d4a017",
                  color: "#111",
                  fontWeight: "700",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  padding: "7px 10px"
                }
              },
              category || "event"
            ),
            featured
              ? e(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      border: "1px solid rgba(212,160,23,.45)",
                      color: "#d4a017",
                      fontWeight: "700",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      padding: "7px 10px"
                    }
                  },
                  "Featured"
                )
              : null
          ),

          e(
            "h1",
            {
              style: {
                margin: "0 0 12px 0",
                fontSize: "44px",
                lineHeight: "1.05",
                color: "#f4efe6"
              }
            },
            title
          ),

          e(
            "p",
            {
              style: {
                color: "#d4a017",
                fontWeight: "700",
                margin: "0 0 10px 0",
                fontSize: "18px"
              }
            },
            `${date}${time ? " • " + time : ""}`
          ),

          e(
            "p",
            {
              style: {
                color: "#d4a017",
                margin: "0 0 18px 0",
                fontSize: "17px"
              }
            },
            address
          ),

          e(
            "p",
            {
              style: {
                color: "rgba(244,239,230,.82)",
                fontSize: "18px",
                lineHeight: "1.6",
                margin: "0 0 22px 0"
              }
            },
            description
          ),

          e(
            "a",
            {
              href: "#",
              style: {
                display: "inline-block",
                background: "#d4a017",
                color: "#111",
                textDecoration: "none",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                padding: "14px 18px"
              }
            },
            "RSVP"
          )
        )
      )
    );
  });
})();