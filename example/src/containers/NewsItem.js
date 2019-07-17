import React from 'react';
import { connect, selectData } from 'jetski'
import { NewsItem } from './Article';

const Articles = ({ articles }) => {
  return Array.isArray(articles) && articles.map((article, i) => (
    <NewsItem key={i} {...article} />
  ))
}

const mapStateToProps = (state) => {
  let { articles = [] } = selectData('news')(state);
  articles = articles.map((a, i) => ({ ...a, url: `/${i}`}));
  return {
    articles
  }
};

export default connect(
  mapStateToProps,
  null
)(Articles);


