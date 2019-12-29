import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard',
        breadcrumbs: false
      },
    ]
  },
  {
    id: 'serviceOrder',
    title: 'Ordem de serviço',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'newOrder',
        title: 'Nova ordem',
        type: 'item',
        icon: 'feather icon-file-plus',
        url: '/service-order/new',
        breadcrumbs: false
      },
      {
        id: 'queryOrder',
        title: 'Consultar',
        type: 'item',
        icon: 'feather icon-search',
        url: '/service-order/query',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'customer',
    title: 'Clientes',
    type: 'group',
    icon: 'feather icon-dollar-sign',
    children: [
      {
        id: 'newCustomer',
        title: 'Novo cliente',
        type: 'item',
        icon: 'feather icon-user-plus',
        url: '/customer/new',
        breadcrumbs: false
      },
      {
        id: 'querycustomer',
        title: 'Consultar',
        type: 'item',
        icon: 'feather icon-search',
        url: '/customer/query',
        breadcrumbs: false
      },
    ]
  },
  {
    id: 'bill',
    title: 'Financeiro',
    type: 'group',
    icon: 'feather icon-dollar-sign',
    children: [
      {
        id: 'newBill',
        title: 'Novo lançamento',
        type: 'item',
        icon: 'feather icon-file-plus',
        url: '/bill/new',
        breadcrumbs: false
      },
      {
        id: 'queryBill',
        title: 'Consultar',
        type: 'item',
        icon: 'feather icon-search',
        url: '/bill/query',
        breadcrumbs: false
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
