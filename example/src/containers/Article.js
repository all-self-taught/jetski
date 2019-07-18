import React from 'react';
import { connect, selectData } from 'jetski'

const imgStyle = {
  hight: 'auto',
  width: '80%',
  border: '4px solid RebeccaPurple ',
  borderRadius: '5%'
};
const articleStyle = {
  width: '50%',
  margin: '0 auto',
  color: 'olive'
}

export const NewsItem = ({ title, urlToImage, description, url }) => {
  return (<article style={articleStyle}>
    <div>
      <h1>{title}</h1>
      <img style={imgStyle} src={urlToImage} alt="" />
      <h2>{description}</h2>
      <a href={url} target={url && !url.includes('localhost') ? '_blank' : ''}>READ MORE</a>
    </div>
  </article>)
}

const mapStateToProps = (state) => {
  const { article } = selectData('news')(state);
  return {
    ...article
  }
};

export default connect(
  mapStateToProps,
  null
)(NewsItem);


