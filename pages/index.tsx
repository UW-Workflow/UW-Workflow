import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Home from "./home";

const Index: NextPage = () => {
  const [script, setScript] = useState<React.ReactNode>();
  function inAppTutorial(g, u, i, d, e, s) {
    g[e] = g[e] || [];
    var f = u.getElementsByTagName(i)[0];
    var k = u.createElement(i);
    k.async = true;
    k.src =
      "https://static.userguiding.com/media/user-guiding-" + s + "-embedded.js";
    f.parentNode.insertBefore(k, f);
    if (g[d]) return;
    var ug = (g[d] = { q: [], c: undefined });
    ug.c = function (n) {
      return function () {
        ug.q.push([n, arguments]);
      };
    };
    var m = [
      "previewGuide",
      "finishPreview",
      "track",
      "identify",
      "triggerNps",
      "hideChecklist",
      "launchChecklist",
    ];
    for (var j = 0; j < m.length; j += 1) {
      ug[m[j]] = ug.c(m[j]);
    }
    return k;
  }

  useEffect(() => {
    !script &&
      setScript(
        inAppTutorial(
          window,
          document,
          "script",
          "userGuiding",
          "userGuidingLayer",
          "482410442ID"
        )
      );
  }, [setScript, script]);
  return (
    <>
      <Home />
    </>
  );
};

export default Index;
