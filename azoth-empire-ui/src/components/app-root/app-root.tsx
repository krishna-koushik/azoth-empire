import {Component, h, Host} from '@stencil/core';

import { createRouter, Route } from 'stencil-router-v2';

const Router = createRouter();

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false,
  scoped: true
})
export class AppRoot {
  render() {
    return (
      <Host>
        <Router.Switch>

          <Route path="/">
            <app-home></app-home>
          </Route>

          <Route path={"/attendance"}>
            <war-attendance></war-attendance>
          </Route>

          <Route path={"/members"}>
            <nw-members></nw-members>
          </Route>

        </Router.Switch>
      </Host>
    );
  }
}
