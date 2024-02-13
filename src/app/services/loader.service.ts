import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { defer, Observable, OperatorFunction } from "rxjs";
import { tap } from "rxjs/operators";
import { CatLoaderComponent } from "../components/cat-loader/cat-loader.component";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true
    })

    constructor(private overlay: Overlay) {
    }

    attachLoader<T>(): OperatorFunction<T, T> {
        return (source: Observable<any>) => {
            let firstSubscription = true;
            let firstNext = true;

            return defer(() => {
                if (firstSubscription) {
                    this.showLoader()
                    firstSubscription = false
                }
                return source.pipe(
                    tap(() => {
                        if (firstNext) {
                            this.hideLoader()
                            firstNext = false
                        }
                    }, () => {
                        if (firstNext) {
                            this.hideLoader()
                            firstNext = false
                        }
                    })
                );
            });
        };
    }

    public showLoader() {
        this.overlayRef.attach(new ComponentPortal(CatLoaderComponent))
    }

    public hideLoader() {
        this.overlayRef.detach()
    }
}