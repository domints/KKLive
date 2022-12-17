export interface IRoutableComponent {
    showBackArrow: boolean;
    toolbarTitle: string;
    toolbarIcon: string;

    onRouteIn();
    onRouteOut();
}