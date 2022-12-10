export interface IRoutableComponent {
    showBackArrow: boolean;
    toolbarTitle: string;

    onRouteIn();
    onRouteOut();
}