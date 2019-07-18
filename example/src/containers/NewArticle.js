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

const mapDispatchToProps = dispatch => ({
  onChange: (name, value) => dispatcher(dispatch).onChange(name)({ target: { value }}),
  onSubmit: (history) => () => {
    dispatcher(dispatch).onSubmit();
    history.push('/');
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewArticle));