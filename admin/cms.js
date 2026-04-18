(function () {
  if (!window.CMS) return;

  CMS.registerPreviewTemplate("events", function (props) {
    const entry = props.entry;

    const title = entry.getIn(["data", "title"]) || "Event title";
    const date = entry.getIn(["data", "date"]) || "";
    const time = entry.getIn(["data", "time"]) || "";
    const address = entry.getIn(["data", "address"]) || "";
    const description = entry.getIn(["data", "description"]) || "";
    const category = entry.getIn(["data", "category"]) || "";
    const image = entry.getIn(["data", "image"]) || "";

    return `
      <div style="font-family: Arial; background:#0b0d0b; color:#f4efe6; padding:20px;">
        
        ${image ? `<img src="${image}" style="width:100%; max-width:720px; height:260px; object-fit:cover; margin-bottom:20px;" />` : ""}

        <div style="background:#111; padding:20px; max-width:720px; border:1px solid rgba(244,239,230,.12)">
          
          <div style="background:#d4a017; color:#111; display:inline-block; padding:6px 10px; font-size:12px; font-weight:bold; margin-bottom:12px;">
            ${category}
          </div>

          <h2 style="margin:0 0 10px 0; font-size:28px;">
            ${title}
          </h2>

          <p style="color:#d4a017; margin:0 0 8px 0;">
            ${date} ${time}
          </p>

          <p style="color:#d4a017; margin:0 0 12px 0;">
            ${address}
          </p>

          <p style="line-height:1.5;">
            ${description}
          </p>

        </div>
      </div>
    `;
  });
})();