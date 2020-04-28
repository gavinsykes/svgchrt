(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SVGChart = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  SVGChart: SVGChart
};

function SVGChart(data = [], options = {}) {
  this.defaultSettings = {
    background: true,
    canvas: {
      height: 500,
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
      viewBox: "0 0 960 500",
      width: 960
    },
    chart: { margin: { top: 10, right: 10, bottom: 10, left: 10 } },
    description: "",
    id: "",
    legend: {
      background: { display: false },
      displaceTitle: false,
      display: false,
      icons: {
        display: false,
        height: 14,
        shape: "rect",
        width: 14
      },
      itemMargin: { top: 5, right: 5, bottom: 5, left: 5 },
      items: [],
      layOverChart: false,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      orientation: "vertical",
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      position: "right",
      title: ""
    },
    subtitle: {
      display: false,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      text: ""
    },
    target: undefined,
    title: {
      display: false,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      text: ""
    }
  };
  this.isObject = function (i) {
    return i && typeof i === "object" && !Array.isArray(i);
  };
  this.deepObjectMerge = function (original, ...newobjs) {
    if (!newobjs.length) return original;
    const newobj = newobjs.shift();
    if (this.isObject(original) && this.isObject(newobj)) {
      for (const key in newobj) {
        if (this.isObject(newobj[key])) {
          if (!original[key]) Object.assign(original, { [key]: {} });
          this.deepObjectMerge(original[key], newobj[key]);
        } else {
          Object.assign(original, { [key]: newobj[key] });
        }
      }
    }
    return this.deepObjectMerge(original, ...newobjs);
  };
  this.appendSVGChild = function (element, target, attributes = {}, text = "") {
    let e = document.createElementNS("http://www.w3.org/2000/svg", element);
    Object.entries(attributes).map((a) => e.setAttribute(a[0], a[1]));
    if (text) {
      e.textContent = text;
    }
    target.appendChild(e);
    return e;
  };
  this.SVGWrapText = function (item, width) {
    if (item.getComputedTextLength() < width) {
      return;
    }
    let words = item.textContent.split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1,
      x = item.getAttribute("x"),
      y = item.getAttribute("y"),
      dy = {
        value: parseFloat(item.getAttribute("dy").match(/[0-9.]/)),
        units: item.getAttribute("dy").match(/[A-Za-z%]+/)[0]
      };
    item.textContent = null;
    let tspan = this.appendSVGChild(
      "tspan",
      item,
      { x: x, y: y, dy: `${dy.value}${dy.units}` },
      null
    );
    while ((word = words.pop())) {
      line.push(word);
      tspan.textContent = line.join(" ");
      if (tspan.getComputedTextLength() > width) {
        line.pop();
        tspan.textContent = line.join(" ");
        line = [word];
        tspan = this.appendSVGChild(
          "tspan",
          item,
          {
            x: x,
            y: y,
            dx: 0,
            dy: `${++lineNumber * lineHeight + dy.value}${dy.units}`
          },
          word
        );
      }
    }
  };
  this.clearCanvas = function () {
    while (this.target.firstChild) {
      this.target.removeChild(this.target.firstChild);
    }
  };
  this.updateData = function (data = {}) {
    this.data = data;
  };
  this.updateOptions = function (options = {}) {
    this.options = options;
    this.settings = this.deepObjectMerge(this.defaultSettings, options);
  };
  this.placeCanvas = function () {
    this.canvas = this.appendSVGChild("svg", this.target, {
      class: "chart svg-chart",
      height: this.settings.canvas.height,
      viewBox: this.settings.canvas.viewBox,
      width: this.settings.canvas.width,
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    });
    if (this.settings.background) {
      this.appendSVGChild("rect", this.canvas, {
        class: "chart-background",
        height: this.settings.canvas.height,
        width: this.settings.canvas.width
      });
    }
    this.layout.title.points.y1 = Math.max(
      this.settings.title.margin.top,
      this.settings.canvas.padding.top,
      0
    );
    this.layout.subtitle.points.y1 = Math.max(
      this.settings.title.margin.top,
      this.settings.canvas.padding.top,
      0
    );
    this.layout.legend.points = {
      x1: Math.max(
        this.settings.legend.margin.left,
        this.settings.canvas.padding.left,
        0
      ),
      x2:
        this.settings.canvas.width -
        Math.max(
          this.settings.legend.margin.right,
          this.settings.canvas.padding.right,
          0
        ),
      y1: Math.max(
        this.settings.legend.margin.top,
        this.settings.canvas.padding.top,
        0
      ),
      y2:
        this.settings.canvas.height -
        Math.max(
          this.settings.legend.margin.bottom,
          this.settings.canvas.padding.bottom,
          0
        )
    };
    this.layout.chart.points = {
      x1: Math.max(
        this.settings.chart.margin.left,
        this.settings.canvas.padding.left,
        0
      ),
      x2:
        this.settings.canvas.width -
        Math.max(
          this.layout.canvas.padding.right,
          this.layout.chart.margin.right,
          0
        ),
      y1: Math.max(
        this.settings.chart.margin.top,
        this.settings.canvas.padding.top,
        0
      ),
      y2:
        this.settings.canvas.height -
        Math.max(
          this.layout.canvas.padding.bottom,
          this.layout.chart.margin.bottom,
          0
        )
    };
    this.layout.chart.width =
      this.layout.chart.points.x2 - this.layout.chart.points.x1;
    this.layout.chart.height =
      this.layout.chart.points.y2 - this.layout.chart.points.y1;
    this.chartArea = this.appendSVGChild("g", this.canvas, {
      class: "chart-area",
      id: `${this.settings.id ? this.settings.id + "-" : ""}chart-area`
    });
  };
  this.addTitle = function () {
    if (this.settings.title.text) {
      this.appendSVGChild("title", this.canvas, {}, this.settings.title.text);
      if (this.settings.title.display) {
        this.title = this.appendSVGChild(
          "text",
          this.canvas,
          {
            class: "chart-title",
            dy: "1em",
            "text-anchor": "middle",
            x: this.layout.canvas.width / 2,
            y: this.layout.title.points.y1
          },
          this.settings.title.text
        );
        if (this.settings.legend.displaceTitle) {
          if (/left/.test(this.settings.legend.position)) {
            let shift = "left";
            this.title.setAttribute(
              "x",
              (this.layout.canvas.width + this.layout.legend.width) / 2
            );
          } else if (/right/.test(this.settings.legend.position)) {
            let shift = "right";
            this.title.setAttribute(
              "x",
              (this.layout.canvas.width - this.layout.legend.width) / 2
            );
          }
        }
        let titleWidth =
          this.layout.canvas.width -
          Math.max(
            this.settings.canvas.padding.left,
            this.settings.title.margin.left,
            0
          ) -
          Math.max(
            this.settings.canvas.padding.right,
            this.settings.title.margin.right,
            0
          ) -
          (this.settings.legend.displaceTitle
            ? this.layout.legend.width +
              (shift = "left"
                ? Math.max(
                    this.settings.legend.margin.left,
                    this.settings.canvas.padding.left,
                    0
                  ) +
                  Math.max(
                    this.settings.title.margin.left,
                    this.settings.legend.margin.right,
                    0
                  )
                : Math.max(
                    this.settings.legend.margin.right,
                    this.settings.canvas.padding.right,
                    0
                  ) +
                  Math.max(
                    this.settings.title.margin.right,
                    this.settings.legend.margin.left,
                    0
                  ))
            : 0);
        this.SVGWrapText(this.title, titleWidth);
        this.layout.title = this.deepObjectMerge(this.layout.title, {
          height: this.title.getBBox().height,
          points: {
            x1: this.title.getBBox().x,
            x2: this.title.getBBox().x + this.title.getBBox().width,
            y2: this.title.getBBox().y + this.title.getBBox().height
          },
          width: this.title.getBBox().width
        });
        this.layout.subtitle.points.y1 =
          this.layout.title.points.y2 +
          Math.max(
            this.layout.title.margin.bottom,
            this.layout.subtitle.margin.top,
            0
          );
        this.layout.chart.points.y1 =
          this.layout.title.points.y2 +
          Math.max(
            this.layout.title.margin.bottom,
            this.layout.chart.margin.top,
            0
          );
        this.layout.chart.height =
          this.layout.chart.points.y2 - this.layout.chart.points.y1;
        if (!this.settings.legend.displaceTitle) {
          this.layout.legend.points.y1 +=
            this.layout.title.height +
            Math.max(
              this.layout.title.margin.bottom,
              this.layout.legend.margin.top,
              0
            );
        }
        if (!this.settings.legend.displaceTitle) {
          this.layout.legend.points.y1 =
            Math.max(
              this.layout.canvas.padding.top,
              this.layout.title.margin.top,
              0
            ) +
            this.layout.title.height +
            Math.max(
              this.layout.title.margin.bottom,
              this.layout.legend.margin.top,
              0
            );
        }
      }
    } else {
      console.warn(
        `You haven't given this chart a title. It will still render okay but a title is strongly recommended for accessibility purposes. If you don't want to display a title but still give it one, set title.text to your title and title.display to false.`
      );
    }
  };
  this.addDescription = function () {
    if (this.settings.description) {
      this.appendSVGChild("desc", this.canvas, {}, this.settings.description);
    }
  };
  this.addSubtitle = function () {
    if (this.settings.subtitle.display && this.settings.subtitle.text) {
      this.subtitle = this.appendSVGChild(
        "text",
        this.canvas,
        {
          class: "chart-subtitle",
          dy: "1em",
          "text-anchor": "middle",
          x: this.canvas.getBBox().width / 2,
          y: this.layout.subtitle.points.y1
        },
        this.settings.subtitle.text
      );
      if (this.settings.legend.displaceTitle) {
        if (/left/.test(this.settings.legend.position)) {
          let shift = "left";
          this.subtitle.setAttribute(
            "x",
            (this.layout.canvas.width + this.layout.legend.width) / 2
          );
        } else if (/right/.test(this.settings.legend.position)) {
          let shift = "right";
          this.subtitle.setAttribute(
            "x",
            (this.layout.canvas.width - this.layout.legend.width) / 2
          );
        }
      }
      let subtitleWidth =
        this.layout.canvas.width -
        Math.max(
          this.settings.canvas.padding.left,
          this.settings.subtitle.margin.left,
          0
        ) -
        Math.max(
          this.settings.canvas.padding.right,
          this.settings.subtitle.margin.right,
          0
        ) -
        (this.settings.legend.displaceTitle
          ? this.layout.legend.width +
            (shift = "left"
              ? Math.max(
                  this.settings.legend.margin.left,
                  this.settings.canvas.padding.left,
                  0
                ) +
                Math.max(
                  this.settings.subtitle.margin.left,
                  this.settings.legend.margin.right,
                  0
                )
              : Math.max(
                  this.settings.legend.margin.right,
                  this.settings.canvas.padding.right,
                  0
                ) +
                Math.max(
                  this.settings.subtitle.margin.right,
                  this.settings.legend.margin.left,
                  0
                ))
          : 0);
      this.SVGWrapText(this.subtitle, subtitleWidth);
      this.layout.subtitle = this.deepObjectMerge(this.layout.subtitle, {
        height: this.subtitle.getBBox().height,
        points: {
          x1: this.subtitle.getBBox().x,
          x2: this.subtitle.getBBox().x + this.subtitle.getBBox().width,
          y2: this.subtitle.getBBox().y + this.subtitle.getBBox().height
        },
        width: this.subtitle.getBBox().width
      });
      if (!this.settings.legend.displaceTitle) {
        this.layout.legend.points.y1 =
          this.layout.subtitle.points.y2 +
          Math.max(
            this.layout.subtitle.margin.bottom,
            this.layout.legend.margin.top,
            0
          );
      }
      this.layout.chart.points.y1 =
        this.layout.subtitle.points.y2 +
        Math.max(
          this.layout.subtitle.margin.bottom,
          this.layout.chart.margin.top,
          0
        );
      this.layout.chart.height =
        this.layout.chart.points.y2 - this.layout.chart.points.y1;
    }
  };
  this.addLegend = function () {
    if (this.settings.legend.display && this.settings.legend.items) {
      this.legend = this.appendSVGChild("g", this.canvas, {
        class: "legend",
        id: `${this.settings.id ? this.settings.id + "-" : ""}legend`
      });
      if (this.settings.legend.background.display) {
        this.legendBackground = this.appendSVGChild("rect", this.legend, {
          class: "legend-background",
          fill: this.settings.legend.background.color,
          rx:
            this.settings.legend.background.rx ||
            this.settings.legend.background.r ||
            0,
          ry:
            this.settings.legend.background.ry ||
            this.settings.legend.background.r ||
            0
        });
      }
      this.legend_items = this.settings.legend.items.map((c, i) =>
        this.appendSVGChild("g", this.legend, {
          class: `legend-item ${
            this.settings.legend.items[i].class
              ? this.settings.legend.items[i].class
              : ""
          }`
        })
      );
      let maxWidth =
        this.layout.legend.points.x2 -
        Math.max(this.settings.legend.padding.left, 0) -
        Math.max(this.settings.legend.padding.right, 0) -
        this.layout.legend.points.x1;
      let maxHeight =
        this.layout.legend.points.y2 -
        Math.max(this.settings.legend.padding.top, 0) -
        Math.max(this.settings.legend.padding.bottom, 0) -
        this.layout.legend.points.y1;

      let legend_lines = [[]];
      let lineCount = 0;

      this.legend_items.map((l, i) => {
        let params = this.deepObjectMerge(
          this.settings.legend.icons,
          this.settings.legend.items[i].icon
        );
        let icon;
        if (params.display) {
          icon = this.appendSVGChild(params.shape, l, {
            class: `legend-item-icon`,
            ...params
          });
        }
        let text = this.appendSVGChild(
          "text",
          l,
          { class: "legend-item-text", dy: "1em" },
          this.settings.legend.items[i].displayName instanceof Function
            ? this.settings.legend.items[i].displayName()
            : this.settings.legend.items[i].displayName
        );
        let translations = { icon: { x: 0, y: 0 }, text: { x: 0, y: 0 } };
        if (icon) {
          translations.text.x = icon.getBBox().width + 4;
          if (icon.getBBox().height > text.getBBox().height) {
            translations.text.y =
              (icon.getBBox().height - text.getBBox().height - 4) / 2;
          } else if (icon.getBBox().height < text.getBBox().height) {
            translations.icon.y =
              (text.getBBox().height - icon.getBBox().height + 6) / 2;
          }
          icon.setAttribute(
            "transform",
            `translate(${translations.icon.x},${translations.icon.y})`
          );
        }
        text.setAttribute(
          "transform",
          `translate(${translations.text.x},${translations.text.y})`
        );
      });

      this.legend_items.map((l, i) => {
        if (this.settings.legend.orientation === "horizontal") {
          if (
            legend_lines[lineCount]
              .slice(0, i + 1)
              .reduce(
                (total, item) =>
                  total +
                  this.settings.legend.itemMargin.right +
                  item.getBBox().width,
                0
              ) +
              l.getBBox().width >
            maxWidth
          ) {
            lineCount++;
            legend_lines.push([]);
          }
          legend_lines[lineCount].push(l);
        } else {
          if (
            legend_lines[lineCount]
              .slice(0, i + 1)
              .reduce(
                (total, item) =>
                  total +
                  this.settings.legend.itemMargin.bottom +
                  item.getBBox().height,
                0
              ) > maxHeight
          ) {
            lineCount++;
            legend_lines.push([]);
          }
          legend_lines[lineCount].push(l);
        }
      });

      legend_lines.forEach((line, index) => {
        line.forEach((el, i) => {
          if (this.settings.legend.orientation === "horizontal") {
            el.setAttribute(
              "transform",
              `translate(${
                Math.max(this.settings.legend.padding.left, 0) +
                line
                  .slice(0, i)
                  .reduce(
                    (total, item) =>
                      total +
                      this.settings.legend.itemMargin.right +
                      item.getBBox().width,
                    0
                  )
              },${
                Math.max(this.settings.legend.padding.top, 0) +
                legend_lines
                  .slice(0, index)
                  .reduce(
                    (total, line) =>
                      total +
                      this.settings.legend.itemMargin.bottom +
                      line.reduce(
                        (max, item) =>
                          item.getBBox().height > max
                            ? item.getBBox().height
                            : max,
                        0
                      ),
                    0
                  )
              })`
            );
          } else {
            el.setAttribute(
              "transform",
              `translate(${
                Math.max(this.settings.legend.padding.left, 0) +
                legend_lines
                  .slice(0, index)
                  .reduce(
                    (total, line) =>
                      total +
                      this.settings.legend.itemMargin.right +
                      line.reduce(
                        (max, item) =>
                          item.getBBox().width > max
                            ? item.getBBox().width
                            : max,
                        0
                      ),
                    0
                  )
              },${
                Math.max(this.settings.legend.padding.top, 0) +
                line
                  .slice(0, i)
                  .reduce(
                    (total, item) =>
                      total +
                      this.settings.legend.itemMargin.bottom +
                      item.getBBox().height,
                    0
                  )
              })`
            );
          }
        });
      });

      if (this.legendBackground) {
        this.legendBackground.setAttribute(
          "width",
          this.settings.legend.padding.left +
            this.legend.getBBox().width +
            this.settings.legend.padding.right
        );
        this.legendBackground.setAttribute(
          "height",
          this.settings.legend.padding.top +
            this.legend.getBBox().height +
            this.settings.legend.padding.bottom
        );
      }
      this.layout.legend = this.deepObjectMerge(this.layout.legend, {
        height: this.legend.getBBox().height,
        width: this.legend.getBBox().width
      });
      let xcoord, ycoord;
      switch (this.settings.legend.position) {
        case "top-left":
          xcoord = this.layout.legend.points.x1;
          ycoord = this.layout.legend.points.y1;
          if (this.settings.legend.orientation === "horizontal") {
            this.settings.displaceTitle = false;
          }
          if (!this.settings.legend.layOverChart) {
            if (this.settings.legend.orientation == "vertical") {
              this.layout.chart.points.x1 =
                Math.max(
                  this.settings.canvas.padding.left,
                  this.settings.legend.margin.left,
                  0
                ) +
                this.layout.legend.width +
                Math.max(
                  this.settings.legend.margin.right,
                  this.settings.chart.margin.left,
                  0
                );
            } else {
              this.layout.chart.points.y1 +=
                Math.max(
                  this.settings.canvas.padding.top,
                  this.settings.legend.margin.top,
                  0
                ) +
                this.layout.legend.height +
                Math.max(
                  this.settings.legend.margin.bottom,
                  this.settings.chart.margin.top,
                  0
                );
            }
          }
          break;
        case "top":
          xcoord = (this.canvas.getBBox().width - this.layout.legend.width) / 2;
          ycoord = this.layout.legend.points.y1;
          this.settings.displaceTitle = false;
          if (!this.settings.legend.layOverChart) {
            this.layout.chart.points.y1 +=
              Math.max(
                this.settings.canvas.padding.top,
                this.settings.legend.margin.top,
                0
              ) +
              this.layout.legend.height +
              Math.max(
                this.settings.legend.margin.bottom,
                this.settings.chart.margin.top,
                0
              );
          }
          break;
        case "top-right":
          xcoord = this.layout.legend.points.x2 - this.layout.legend.width;
          ycoord = this.layout.legend.points.y1;
          if (this.settings.legend.orientation === "horizontal") {
            this.settings.displaceTitle = false;
          }
          if (!this.settings.legend.layOverChart) {
            if (this.settings.legend.orientation == "vertical") {
              this.layout.chart.points.x2 =
                this.settings.canvas.width -
                (Math.max(
                  this.settings.canvas.padding.right,
                  this.settings.legend.margin.right,
                  0
                ) +
                  this.layout.legend.width +
                  Math.max(
                    this.settings.legend.margin.left,
                    this.settings.chart.margin.right,
                    0
                  ));
            } else {
              this.layout.chart.points.y1 +=
                Math.max(
                  this.settings.canvas.padding.top,
                  this.settings.legend.margin.top,
                  0
                ) +
                this.layout.legend.height +
                Math.max(
                  this.settings.legend.margin.bottom,
                  this.settings.chart.margin.top,
                  0
                );
            }
          }
          break;
        case "right":
          xcoord = this.layout.legend.points.x2 - this.layout.legend.width;
          ycoord =
            (this.layout.legend.points.y1 + this.layout.legend.points.y2 - this.layout.legend.height) / 2;
          if (!this.settings.legend.layOverChart) {
            this.layout.chart.points.x2 =
              this.layout.canvas.width -
              (Math.max(
                this.settings.canvas.padding.right,
                this.settings.legend.margin.right,
                0
              ) +
                this.layout.legend.width +
                Math.max(
                  this.settings.legend.margin.left,
                  this.settings.chart.margin.right,
                  0
                ));
          }
          break;
        case "bottom-right":
          xcoord = this.layout.legend.points.x2 - this.layout.legend.width;
          ycoord = this.layout.legend.points.y2 - this.layout.legend.height;
          if (!this.settings.legend.layOverChart) {
            if (this.settings.legend.orientation == "vertical") {
              this.layout.chart.points.x2 =
                this.layout.canvas.width -
                (Math.max(
                  this.settings.canvas.padding.right,
                  this.settings.legend.margin.right,
                  0
                ) +
                  this.layout.legend.width +
                  Math.max(
                    this.settings.legend.margin.left,
                    this.settings.chart.margin.right,
                    0
                  ));
            } else {
              this.layout.chart.points.y2 =
                this.layout.canvas.height -
                (Math.max(
                  this.settings.canvas.padding.bottom,
                  this.settings.legend.margin.bottom,
                  0
                ) +
                  this.layout.legend.height +
                  Math.max(
                    this.settings.legend.margin.top,
                    this.settings.chart.margin.bottom,
                    0
                  ));
            }
          }
          break;
        case "bottom":
          xcoord = (this.canvas.getBBox().width - this.layout.legend.width) / 2;
          ycoord = this.layout.legend.points.y2 - this.layout.legend.height;
          if (!this.settings.legend.layOverChart) {
            this.layout.chart.points.y2 =
              this.layout.canvas.height -
              (Math.max(
                this.settings.canvas.padding.bottom,
                this.settings.legend.margin.bottom,
                0
              ) +
                this.layout.legend.height +
                Math.max(
                  this.settings.legend.margin.top,
                  this.settings.chart.margin.bottom,
                  0
                ));
          }
          break;
        case "bottom-left":
          xcoord = this.layout.legend.points.x1;
          ycoord = this.layout.legend.points.y2 - this.layout.legend.height;
          if (!this.settings.legend.layOverChart) {
            if (this.settings.legend.orientation == "vertical") {
              this.layout.chart.points.x1 =
                Math.max(
                  this.settings.canvas.padding.left,
                  this.settings.legend.margin.left,
                  0
                ) +
                this.layout.legend.width +
                Math.max(
                  this.settings.legend.margin.right,
                  this.settings.chart.margin.left,
                  0
                );
            } else {
              this.layout.chart.points.y2 =
                this.layout.canvas.height -
                (Math.max(
                  this.settings.canvas.padding.bottom,
                  this.settings.legend.margin.bottom,
                  0
                ) +
                  this.layout.legend.height +
                  Math.max(
                    this.settings.legend.margin.top,
                    this.settings.chart.margin.bottom,
                    0
                  ));
            }
          }
          break;
        case "left":
          xcoord = this.layout.legend.points.x1;
          ycoord =
            (this.layout.legend.points.y1 + this.layout.legend.points.y2 - this.layout.legend.height) / 2;
          if (!this.settings.legend.layOverChart) {
            this.layout.chart.points.x1 =
              Math.max(
                this.settings.canvas.padding.left,
                this.settings.legend.margin.left,
                0
              ) +
              this.layout.legend.width +
              Math.max(
                this.settings.legend.margin.right,
                this.settings.chart.margin.left,
                0
              );
          }
          break;
      }
      this.layout.chart.width =
        this.layout.chart.points.x2 - this.layout.chart.points.x1;
      this.layout.chart.height =
        this.layout.chart.points.y2 - this.layout.chart.points.y1;
      this.legend.setAttribute("transform", `translate(${xcoord},${ycoord})`);
      this.layout.legend = this.deepObjectMerge(this.layout.legend, {
        points: {
          x1: this.legend.getBBox().x,
          x2: this.legend.getBBox().x + this.legend.getBBox().width,
          y1: this.legend.getBBox().y,
          y2: this.legend.getBBox().y + this.legend.getBBox().height
        }
      });
    }
  };
  this.plot = function () {
    this.appendSVGChild("rect", this.chartArea, {
      fill: "#F808",
      width: this.layout.chart.width,
      height: this.layout.chart.height
    });
    this.placePlot();
  };
  this.placePlot = function() {
    this.chartArea.setAttribute('transform',`translate(${this.getChartArea().points.x1},${this.getChartArea().points.y1})`);
  };
  this.getChartArea = function () {
    return {
      height: this.layout.chart.height,
      points: {
        x1: this.layout.chart.points.x1,
        x2: this.layout.chart.points.x2,
        y1: this.layout.chart.points.y1,
        y2: this.layout.chart.points.y2
      },
      width: this.layout.chart.width
    };
  };
  this.buildSurround = function () {
    this.clearCanvas();
    this.placeCanvas();
    if (
      this.settings.legend.position == "top" ||
      this.settings.legend.position == "bottom" ||
      this.settings.legend.orientation == "horizontal"
    ) {
      this.settings.legend.displaceTitle = false;
    }
    if (
      this.settings.legend.display &&
      this.settings.legend.orientation == "vertical" &&
      this.settings.legend.displaceTitle
    ) {
      this.addLegend();
      this.addTitle();
      this.addSubtitle();
    } else {
      this.addTitle();
      this.addSubtitle();
      this.addLegend();
    }
  };
  this.render = function () {
    this.buildSurround();
    if (this.plot instanceof Function) {
      this.plot();
    }
  };
  if (!options) {
    console.warn(
      `You haven't set any options for the chart, it should still render however it may not look the way you want it to.`
    );
  }
  if (!data) {
    throw new Error(
      `You need to provide some data for the chart to work with!`
    );
    return;
  }
  this.settings = this.deepObjectMerge(this.defaultSettings, options);
  this.layout = {
    canvas: {
      height: this.settings.canvas.height,
      padding: this.settings.canvas.padding,
      width: this.settings.canvas.width
    },
    chart: {
      axes: {
        bottom: {
          height: 0,
          label: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          scale: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          width: 0
        },
        left: {
          height: 0,
          label: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          scale: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          width: 0
        },
        right: {
          height: 0,
          label: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          scale: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          width: 0
        },
        top: {
          height: 0,
          label: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          points: { x1: 0, x2: 0, y1: 0, y2: 0 },
          scale: {
            height: 0,
            points: { x1: 0, x2: 0, y1: 0, y2: 0 },
            width: 0
          },
          width: 0
        }
      },
      height: 0,
      margin: this.settings.chart.margin,
      points: {
        x1: Math.max(
          this.settings.canvas.padding.left,
          this.settings.chart.margin.left,
          0
        ),
        x2:
          this.settings.canvas.width -
          Math.max(
            this.settings.canvas.padding.right,
            this.settings.chart.margin.right,
            0
          ),
        y1: Math.max(
          this.settings.canvas.padding.top,
          this.settings.chart.margin.top,
          0
        ),
        y2:
          this.settings.canvas.height -
          Math.max(
            this.settings.canvas.padding.bottom,
            this.settings.chart.margin.bottom,
            0
          )
      },
      width: 0
    },
    legend: {
      height: 0,
      items: [],
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      points: {
        x1: Math.max(
          this.settings.canvas.padding.left,
          this.settings.legend.margin.left,
          0
        ),
        x2:
          this.settings.canvas.width -
          Math.max(
            this.settings.canvas.padding.right,
            this.settings.legend.margin.right,
            0
          ),
        y1: Math.max(
          this.settings.canvas.padding.top,
          this.settings.legend.margin.top,
          0
        ),
        y2:
          this.settings.canvas.height -
          Math.max(
            this.settings.canvas.padding.bottom,
            this.settings.legend.margin.bottom,
            0
          )
      },
      position: "bottom",
      width: 0
    },
    subtitle: {
      height: 0,
      margin: { top: 5, right: 10, bottom: 5, left: 10 },
      points: { x1: 0, x2: 0, y1: 0, y2: 0 },
      width: 0
    },
    title: {
      height: 0,
      margin: { top: 10, right: 10, bottom: 5, left: 10 },
      points: { x1: 0, x2: 0, y1: 0, y2: 0 },
      width: 0
    }
  };
  this.target = /^#\w*/i.test(this.settings.target)
    ? document.getElementById(this.settings.target.substring(1))
    : document.getElementById(this.settings.target);
  if (!this.target) {
    throw new Error(
      `Sorry, ${this.settings.target} doesn't appear to exist in the document. Please use a target <div> or <section> that is already in the document to display your visualisation.`
    );
    return;
  }
  this.tET = this.target.tagName.toLowerCase();
  if (!["div", "section"].includes(this.tET)) {
    throw new Error(
      `Sorry, ${this.settings.target} doesn't appear to be a <div> or <section>. You need to select one of those from the document to display your visualisation.`
    );
    return;
  }
  this.data = data;
  
  return {
    addLegend: this.addLegend,
    addSubtitle: this.addSubtitle,
    addTitle: this.addTitle,
    appendSVGChild: this.appendSVGChild,
    buildSurround: this.buildSurround,
    chartArea: this.chartArea,
    clearCanvas: this.clearCanvas,
    data: this.data,
    deepObjectMerge: this.deepObjectMerge,
    defaultSettings: this.defaultSettings,
    getChartArea: this.getChartArea,
    isObject: this.isObject,
    layout: this.layout,
    placeCanvas: this.placeCanvas,
    placePlot: this.placePlot,
    plot: this.plot,
    render: this.render,
    settings: this.settings,
    SVGWrapText: this.SVGWrapText,
    target: this.target
  };
}

},{}]},{},[1])(1)
});
