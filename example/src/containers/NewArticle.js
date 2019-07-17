import React from 'react';
import Form from 'react-jsonschema-form';
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import { connect, dispatcher, selectForm } from 'jetski';

const CustomSchemaField = (props) => {

    const customProps = {};

    //Only process if we are dealing with a field, not the parent object
    if (props.name) {

        const formContext = props.registry.formContext;        
        
        //Store the original onChange event provided to the SchemaField
        //as well as the name of the field
        const { onChange, name } = props;

        //Provide a new onChange event for the SchemaField
        customProps.onChange = (formData) => {

            //Call the custom handler provided in the formContext, if it exists,
            //with the field name and new value
            if (formContext && formContext.onFieldChange && 
                typeof formContext.onFieldChange === 'function') {
                formContext.onFieldChange(name, formData);
            }

            //Call the original onChange handler
            onChange(formData);
        };

    }

    return (
        <SchemaField {...props} {...customProps} />
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

const NewArticle = ({ onChange, onSubmit, formData }) => {
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
        onSubmit={onSubmit}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  formData: selectForm(state)
});

const mapDispatchToProps = dispatch => ({
  onChange: (name, value) => dispatcher(dispatch).onChange(name)({ target: { value }}),
  onSubmit: dispatcher(dispatch).onSubmit
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);