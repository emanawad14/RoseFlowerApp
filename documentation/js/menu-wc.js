'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@rose-flower/source documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutComponent.html" data-type="entity-link" >AboutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddAddressComponent.html" data-type="entity-link" >AddAddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressDialogComponent.html" data-type="entity-link" >AddressDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddressesComponent.html" data-type="entity-link" >AddressesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthLayoutComponent.html" data-type="entity-link" >AuthLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvatarFeaturesComponent.html" data-type="entity-link" >AvatarFeaturesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BestComponent.html" data-type="entity-link" >BestComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CarousolComponent.html" data-type="entity-link" >CarousolComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CartComponent.html" data-type="entity-link" >CartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CartLayoutComponent.html" data-type="entity-link" >CartLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CatigoryComponent.html" data-type="entity-link" >CatigoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChangePasswordComponent.html" data-type="entity-link" >ChangePasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorComponent.html" data-type="entity-link" >ErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FeaturesComponent.html" data-type="entity-link" >FeaturesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FieldErrorComponent.html" data-type="entity-link" >FieldErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPasswordComponent.html" data-type="entity-link" >ForgetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GallaryComponent.html" data-type="entity-link" >GallaryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GetAddressesComponent.html" data-type="entity-link" >GetAddressesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GiftUiComponent.html" data-type="entity-link" >GiftUiComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GlobalCkeckboxGroupComponent.html" data-type="entity-link" >GlobalCkeckboxGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GlobalInputComponent.html" data-type="entity-link" >GlobalInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImageContainerComponent.html" data-type="entity-link" >ImageContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingComponent.html" data-type="entity-link" >LoadingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainLayoutComponent.html" data-type="entity-link" >MainLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MyAccountComponent.html" data-type="entity-link" >MyAccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavBarComponent.html" data-type="entity-link" >NavBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NxWelcomeComponent.html" data-type="entity-link" >NxWelcomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrimaryBtnComponent.html" data-type="entity-link" >PrimaryBtnComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductCartComponent.html" data-type="entity-link" >ProductCartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductComponent.html" data-type="entity-link" >ProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductDetailComponent.html" data-type="entity-link" >ProductDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductListComponent.html" data-type="entity-link" >ProductListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductReviewComponent.html" data-type="entity-link" >ProductReviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileImageComponent.html" data-type="entity-link" >ProfileImageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RelatedProductsComponent.html" data-type="entity-link" >RelatedProductsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SharedProductsComponent.html" data-type="entity-link" >SharedProductsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShippingAddressComponent.html" data-type="entity-link" >ShippingAddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpecialGiftsComponent.html" data-type="entity-link" >SpecialGiftsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StarsRatingsComponent.html" data-type="entity-link" >StarsRatingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepperComponent.html" data-type="entity-link" >StepperComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TrustedbyComponent.html" data-type="entity-link" >TrustedbyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VerifyCodeComponent.html" data-type="entity-link" >VerifyCodeComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthEndPoints.html" data-type="entity-link" >AuthEndPoints</a>
                            </li>
                            <li class="link">
                                <a href="classes/FiltersAPIEEndpoints.html" data-type="entity-link" >FiltersAPIEEndpoints</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDetailEndpoints.html" data-type="entity-link" >ProductDetailEndpoints</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddressService.html" data-type="entity-link" >AddressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AddressService-1.html" data-type="entity-link" >AddressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppEffects.html" data-type="entity-link" >AppEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthApiService.html" data-type="entity-link" >AuthApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthLoginApiAdapter.html" data-type="entity-link" >AuthLoginApiAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthRegisterAdapterer.html" data-type="entity-link" >AuthRegisterAdapterer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatigoryService.html" data-type="entity-link" >CatigoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CookiesService.html" data-type="entity-link" >CookiesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountbycategoryAdapter.html" data-type="entity-link" >CountbycategoryAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountByCategoryService.html" data-type="entity-link" >CountByCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ForgetPasswordAdapter.html" data-type="entity-link" >ForgetPasswordAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HomeService.html" data-type="entity-link" >HomeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogoutAdapter.html" data-type="entity-link" >LogoutAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MyTranslateService.html" data-type="entity-link" >MyTranslateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OccasionAdapter.html" data-type="entity-link" >OccasionAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OccasionService.html" data-type="entity-link" >OccasionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsEffects.html" data-type="entity-link" >ProductsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResetPasswordAdapter.html" data-type="entity-link" >ResetPasswordAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewService.html" data-type="entity-link" >ReviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedDataService.html" data-type="entity-link" >SharedDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VerifyCodeAdapter.html" data-type="entity-link" >VerifyCodeAdapter</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Adapter.html" data-type="entity-link" >Adapter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Adapter-1.html" data-type="entity-link" >Adapter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressResponceInterface.html" data-type="entity-link" >AddressResponceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressState.html" data-type="entity-link" >AddressState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressStateInterface.html" data-type="entity-link" >AddressStateInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddReviewRequestInterface.html" data-type="entity-link" >AddReviewRequestInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddReviewResponseDTO.html" data-type="entity-link" >AddReviewResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddToCartRequestInterface.html" data-type="entity-link" >AddToCartRequestInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddToCartResponseDTO.html" data-type="entity-link" >AddToCartResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthApiInterface.html" data-type="entity-link" >AuthApiInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartItem.html" data-type="entity-link" >CartItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartOrderDTO.html" data-type="entity-link" >CartOrderDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/cartStateInterface.html" data-type="entity-link" >cartStateInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartStates.html" data-type="entity-link" >CartStates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Catigory.html" data-type="entity-link" >Catigory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CatigoryResponse.html" data-type="entity-link" >CatigoryResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CheckboxOption.html" data-type="entity-link" >CheckboxOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CookieOptions.html" data-type="entity-link" >CookieOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Countbycategory.html" data-type="entity-link" >Countbycategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountByCategoryApiInterface.html" data-type="entity-link" >CountByCategoryApiInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountbycategoryResponse.html" data-type="entity-link" >CountbycategoryResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Country.html" data-type="entity-link" >Country</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCreditOrderResponseInterface.html" data-type="entity-link" >CreateCreditOrderResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOrderRequestInterface.html" data-type="entity-link" >CreateOrderRequestInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/deleteCartResponseDTO.html" data-type="entity-link" >deleteCartResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorMessage.html" data-type="entity-link" >ErrorMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorResponseDTO.html" data-type="entity-link" >ErrorResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorResponseDTO-1.html" data-type="entity-link" >ErrorResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorResponseInterface.html" data-type="entity-link" >ErrorResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Feature.html" data-type="entity-link" >Feature</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilteredObject.html" data-type="entity-link" >FilteredObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgetPasswordAdapterRes.html" data-type="entity-link" >ForgetPasswordAdapterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgetPasswordDTO.html" data-type="entity-link" >ForgetPasswordDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgetPasswordResponseDTO.html" data-type="entity-link" >ForgetPasswordResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GalleryImage.html" data-type="entity-link" >GalleryImage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/getLoggedUserDataDTO.html" data-type="entity-link" >getLoggedUserDataDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Gift.html" data-type="entity-link" >Gift</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IItems.html" data-type="entity-link" >IItems</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IItemsRespon.html" data-type="entity-link" >IItemsRespon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginAdapterRes.html" data-type="entity-link" >LoginAdapterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginDTO.html" data-type="entity-link" >LoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponseDTO.html" data-type="entity-link" >LoginResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogoutAdapterRes.html" data-type="entity-link" >LogoutAdapterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LogoutResponseDTO.html" data-type="entity-link" >LogoutResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Metadata.html" data-type="entity-link" >Metadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Occasion.html" data-type="entity-link" >Occasion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OccasionApiInterface.html" data-type="entity-link" >OccasionApiInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OccasionResponseInterface.html" data-type="entity-link" >OccasionResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentMethod.html" data-type="entity-link" >PaymentMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductDetailsDTO.html" data-type="entity-link" >ProductDetailsDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductImage.html" data-type="entity-link" >ProductImage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductInCartDTO.html" data-type="entity-link" >ProductInCartDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductModel.html" data-type="entity-link" >ProductModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductResponse.html" data-type="entity-link" >ProductResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterAdapterRes.html" data-type="entity-link" >RegisterAdapterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterDTO.html" data-type="entity-link" >RegisterDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterResponseDTO.html" data-type="entity-link" >RegisterResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelatedProductsDTO.html" data-type="entity-link" >RelatedProductsDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordAdapterRes.html" data-type="entity-link" >ResetPasswordAdapterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordDTO.html" data-type="entity-link" >ResetPasswordDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordResponseDTO.html" data-type="entity-link" >ResetPasswordResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShippingAddress.html" data-type="entity-link" >ShippingAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenInterface.html" data-type="entity-link" >TokenInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateQuantityRequest.html" data-type="entity-link" >UpdateQuantityRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDTO.html" data-type="entity-link" >UserDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyCodeAdapterRes.html" data-type="entity-link" >VerifyCodeAdapterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyCodeDTO.html" data-type="entity-link" >VerifyCodeDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyCodeResponseDTO.html" data-type="entity-link" >VerifyCodeResponseDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewCartState.html" data-type="entity-link" >ViewCartState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewDialogState.html" data-type="entity-link" >ViewDialogState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});