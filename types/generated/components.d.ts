import type { Attribute, Schema } from '@strapi/strapi';

export interface SharedAttribute extends Schema.Component {
  collectionName: 'components_shared_attributes';
  info: {
    displayName: 'Attribute';
    icon: 'bulletList';
  };
  attributes: {
    key: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    value: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.attribute': SharedAttribute;
      'shared.seo': SharedSeo;
    }
  }
}
