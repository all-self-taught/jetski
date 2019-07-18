# JETSKI
All in one API, state, and route management using a JSON configuration file.

## Installation
`npm i -S jetski` or `yarn add jetski`

## Usage Example

See `example` for full implementation.

```
./index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Jetski, { configure } from 'jetski';
import config from './config';

const store = configure(config);

ReactDOM.render(
  <Jetski store={store} />,
  document.getElementById('root')
);
```
```
./config/index.js

import App from '../components/App';
import Article from '../containers/Article';
import NewArticle from '../containers/NewArticle';

export default {
  global: {
    "BASE_URL": 'http://localhost:8080'
  },
  pages: [
    {
      route: {
        path: '/',
        component: App,
        exact: true
      },
      submit: {
        url: '/articles',
        method: 'GET',
        name: 'news'  
      }
    },
    {
      route: {
        path: '/new',
        component: NewArticle,
      },
      submit: {
        url: '/articles/new',
        method: 'POST',
        name: 'news'
      }
    },
    {
      route: {
        path: '/:id',
        component: Article,
      },
      load: [
        {
          url: '/articles/:id',
          method: 'GET',
          name: 'news'
        }
      ]
    }
  ]
}
```

## Connect Components
Use the `selectData` function to pull from the name given in the config file.

For example, in this component, `NewsItem` belongs to the `news` object.

Then deconstruct the mapped props in the function parameters. The mapped props should match the contract with API exactly.

```
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
```

## Standard Dispatcher
The `dispatcher` returns an object with two functions: `onChange` and `onSubmit`. Here, `onChange` isn't used, but `onSubmit` is passed to the button to retrieve articles.

```
import React from 'react';
import { Link, connect, dispatcher } from 'jetski';

...

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, newHover: false };
  }
  render() {
    const { onSubmit } = this.props;
    return (
      <div style={containerStyle}>
        <button onClick={onSubmit}>Press to see News</button>
      </div>
    );
  }
};

export default connect(
  null,
  dispatcher,
)(Button);
```

## Custom Dispatcher
In this example, the custom dispatcher uses both functions, `onChange` and `onSubmit`. Each field on change passes a name and a value, the name is used as a key in the Redux store. `onSubmit` is extended to send the user back to the home page after clicking submit.

```
import React from 'react';
import Form from 'react-jsonschema-form';
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import { withRouter, connect, dispatcher, selectForm } from 'jetski';

const CustomSchemaField = ({ onChange, name, ...rest }) => {
  const customProps = {};
  if (name) {
    const formContext = rest.registry.formContext;        
    customProps.onChange = (formData) => {
      if (formContext && formContext.onFieldChange && 
        typeof formContext.onFieldChange === 'function') {
        formContext.onFieldChange(name, formData);
      }
      onChange(formData);
    };
  }
  return (
    <SchemaField onChange={onChange} name={name} {...rest} {...customProps} />
  );
};

const schema = {
  title: 'New Article',
  type: 'object',
  required: ['title', 'urlToImage', 'description', 'url'],
  properties: {
    title: {type: 'string', title: 'Title'},
    urlToImage: {type: 'string', title: 'Image Url'},
    description: {type: 'string', title: 'Description'},
    url: {type: 'string', title: 'Url'}
  }
};

const uiSchema = {
  description: {
    'ui:widget': 'textarea'
  }
}

const NewArticle = ({ onChange, onSubmit, formData, history }) => {
  const context = {
    onFieldChange: onChange
  }
  return (
    <div style={{ margin: '0 auto', width: '80%' }}>
      <Form 
        fields={{ SchemaField: CustomSchemaField }}
        schema={schema}
        uiSchema={uiSchema}
        formContext={context}
        formData={formData}
        onSubmit={onSubmit(history)}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  formData: selectForm(state)
});

const mapDispatchToProps = dispatch => {
  const customDispatch = dispatcher(dispatch);
  return {
    onChange: (name, value) => customDispatch.onChange(name)({ target: { value }}),
    onSubmit: (history) => () => {
      customDispatch.onSubmit();
      history.push('/');
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewArticle));
```

## Issues and Feature Requests
Feel free to open an issue for bugs and feature requests.

## Contributing
Feel free to open a PR to contribute.

