//
// /**
//  * @license
//  * Copyright Google LLC All Rights Reserved.
//  *
//  * Use of this source code is governed by an MIT-style license that can be
//  * found in the LICENSE file at https://angular.io/license
//  */
//
// import {NgModule} from '@angular/core';
// import {AppTable} from './table';
// import {CdkTableModule} from '@angular/cdk/table';
// import {
//   AppCell,
//   AppCellDef,
//   AppColumnDef,
//   AppFooterCell,
//   AppFooterCellDef,
//   AppHeaderCell,
//   AppHeaderCellDef
// } from './cell';
// import {
//   AppFooterRow,
//   AppFooterRowDef,
//   AppHeaderRow,
//   AppHeaderRowDef,
//   AppRow,
//   AppRowDef
// } from './row';
// import {CommonModule} from '@angular/common';
// import {MatCommonModule} from '@angular/material/core';
//
// const EXPORTED_DECLARATIONS = [
//   // Table
//   AppTable,
//
//   // Template defs
//   AppHeaderCellDef,
//   AppHeaderRowDef,
//   AppColumnDef,
//   AppCellDef,
//   AppRowDef,
//   AppFooterCellDef,
//   AppFooterRowDef,
//
//   // Cell directives
//   AppHeaderCell,
//   AppCell,
//   AppFooterCell,
//
//   // Row directions
//   AppHeaderRow,
//   AppRow,
//   AppFooterRow,
// ];
//
// @NgModule({
//   imports: [CdkTableModule, CommonModule, MatCommonModule],
//   exports: EXPORTED_DECLARATIONS,
//   declarations: EXPORTED_DECLARATIONS,
// })
// export class MatTableModule {}
