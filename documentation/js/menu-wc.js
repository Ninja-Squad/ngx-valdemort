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
                    <a href="index.html" data-type="index-link">ngx-valdemort documentation</a>
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
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ValdemortModule.html" data-type="entity-link" >ValdemortModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' : 'data-target="#xs-components-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' :
                                            'id="xs-components-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' }>
                                            <li class="link">
                                                <a href="components/ValidationErrorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationErrorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' : 'data-target="#xs-directives-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' :
                                        'id="xs-directives-links-module-ValdemortModule-1cb3245fbc1f2306482c5d48aeea1973de7d37d4b70400ba875cebcab9ae1477d1731bc601c0bd978135dbf1b8531d126881bd26e4ade761d94aaf7ca808230f"' }>
                                        <li class="link">
                                            <a href="directives/DefaultValidationErrorsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultValidationErrorsDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ValidationErrorDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationErrorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ValidationFallbackDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidationFallbackDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ValidationErrorsComponent.html" data-type="entity-link" >ValidationErrorsComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/DefaultValidationErrorsDirective.html" data-type="entity-link" >DefaultValidationErrorsDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ValidationErrorDirective.html" data-type="entity-link" >ValidationErrorDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ValidationFallbackDirective.html" data-type="entity-link" >ValidationFallbackDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DefaultValidationErrors.html" data-type="entity-link" >DefaultValidationErrors</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValdemortConfig.html" data-type="entity-link" >ValdemortConfig</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ErrorsToDisplay.html" data-type="entity-link" >ErrorsToDisplay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FallbackError.html" data-type="entity-link" >FallbackError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationErrorContext.html" data-type="entity-link" >ValidationErrorContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationFallbackContext.html" data-type="entity-link" >ValidationFallbackContext</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});