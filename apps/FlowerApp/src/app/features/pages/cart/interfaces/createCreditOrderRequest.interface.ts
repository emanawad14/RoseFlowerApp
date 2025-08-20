import { ShippingAddress } from './createOrderRequest.interface';

export interface CreateCreditOrderResponseInterface {
  message: string;
  session: {
    id: string;
    object: string;
    adaptive_pricing: {
      enabled: boolean;
    };
    after_expiration: any;
    allow_promotion_codes: any;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
      enabled: boolean;
      liability: any;
      provider: any;
      status: any;
    };
    billing_address_collection: any;
    cancel_url: string;
    client_reference_id: string;
    client_secret: any;
    collected_information: {
      shipping_details: any;
    };
    consent: any;
    consent_collection: any;
    created: number;
    currency: string;
    currency_conversion: any;
    custom_fields: any;
    custom_text: {
      after_submit: any;
      shipping_address: any;
      submit: any;
      terms_of_service_acceptance: any;
    };
    customer: any;
    customer_creation: string;
    customer_details: {
      address: any;
      email: string;
      name: any;
      phone: any;
      tax_exempt: string;
      tax_ids: any;
    };
    customer_email: string;
    discounts: any;
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
    invoice: any;
    invoice_creation: {
      enabled: boolean;
      invoice_data: {
        account_tax_ids: any;
        custom_fields: any;
        description: any;
        footer: any;
        issuer: any;
        metadata: any;
        rendering_options: any;
      };
    };
    livemode: boolean;
    locale: any;
    metadata: ShippingAddress;
    mode: string;
    origin_context: any;
    payment_intent: any;
    payment_link: any;
    payment_method_collection: string;
    payment_method_configuration_details: {
      id: string;
      parent: any;
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
    shipping_options:any;
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
