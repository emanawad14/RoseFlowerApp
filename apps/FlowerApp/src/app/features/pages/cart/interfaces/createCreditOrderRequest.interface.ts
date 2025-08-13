import { ShippingAddress } from './createOrderRequest.interface';

export interface CreateCreditOrderResponseInterface {
  message: string;
  session: {
    id: string;
    object: string;
    adaptive_pricing: {
      enabled: boolean;
    };
    after_expiration: null;
    allow_promotion_codes: null;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
      enabled: boolean;
      liability: null;
      provider: null;
      status: null;
    };
    billing_address_collection: null;
    cancel_url: string;
    client_reference_id: string;
    client_secret: null;
    collected_information: {
      shipping_details: null;
    };
    consent: null;
    consent_collection: null;
    created: number;
    currency: string;
    currency_conversion: null;
    custom_fields: [];
    custom_text: {
      after_submit: null;
      shipping_address: null;
      submit: null;
      terms_of_service_acceptance: null;
    };
    customer: null;
    customer_creation: string;
    customer_details: {
      address: null;
      email: string;
      name: null;
      phone: null;
      tax_exempt: string;
      tax_ids: null;
    };
    customer_email: string;
    discounts: [];
    expires_at: number;
    invalid_payment_methods_hash: {
      bancontact: {
        message: string;
      };
      cashapp: {
        message: string;
      };
      eps: {
        message: string;
      };
      giropay: {
        message: string;
      };
      ideal: {
        message: string;
      };
      transfers: {
        message: string;
      };
    };
    invoice: null;
    invoice_creation: {
      enabled: boolean;
      invoice_data: {
        account_tax_ids: null;
        custom_fields: null;
        description: null;
        footer: null;
        issuer: null;
        metadata: {};
        rendering_options: null;
      };
    };
    livemode: false;
    locale: null;
    metadata: ShippingAddress;
    mode: string;
    origin_context: null;
    payment_intent: null;
    payment_link: null;
    payment_method_collection: string;
    payment_method_configuration_details: {
      id: string;
      parent: null;
    };
    payment_method_options: {
      card: {
        request_three_d_secure: string;
      };
    };
    payment_method_types: string[];
    payment_status: string;
    permissions: null;
    phone_number_collection: {
      enabled: boolean;
    };
    recovered_from: null;
    saved_payment_method_options: null;
    setup_intent: null;
    shipping_address_collection: null;
    shipping_cost: null;
    shipping_details: null;
    shipping_options: [];
    status: string;
    submit_type: null;
    subscription: null;
    success_url: string;
    total_details: {
      amount_discount: number;
      amount_shipping: number;
      amount_tax: number;
    };
    ui_mode: string;
    url: string;
    wallet_options: null;
  };
}
