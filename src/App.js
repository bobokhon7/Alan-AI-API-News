import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./Components/NewsCards/NewsCards";
import useStyles from "./style.js";
import wordsToNumbers from "words-to-numbers";

const alanKey = "c7996c26f269499ee788384d2bd2b70b2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  const [newArticles, setNewArticles] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewArticles(articles);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
