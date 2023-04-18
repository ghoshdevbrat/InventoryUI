import { Injectable } from "@angular/core";
export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    childMenu?: Menu[];
}

const menuList = [
    { state: 'dashboard', type: 'link', name: 'Dashboard', icon: 'av_timer', childMenu: null },
    { state: 'bankSettlement', type: 'link', name: 'Bank Settlement Report', icon: 'account_balance' },
    { state: 'transactionReport', type: 'link', name: 'Transaction Report', icon: 'crop_7_5' },
    //{ state: 'topRequest', type: 'link', name: 'Top-Up Request Report', icon: 'view_comfy' },
    { state: 'topHistory', type: 'link', name: 'Top-Up History Report', icon: 'view_comfy' },
    { state: 'topHistorySummary', type: 'link', name: 'Top-Up History Summary', icon: 'view_list' },
    { state: 'topUpRequest', type: 'link', name: 'Top-Up Request', icon: 'view_comfy' },
    { state: 'prepaidCardTopUpRequest', type: 'link', name: 'Prepaid Card Top-Up Request', icon: 'view_comfy' },
    { state: 'merchantActivityReport', type: 'link', name: 'Merchant Activity Report', icon: 'view_headline' },
    { state: 'agentAccessibility', type: 'link', name: 'Agent Accessibility', icon: 'tab' },
    { state: 'ccfConfiguration', type: 'link', name: 'Ccf Configuration', icon: 'settings' },
    { state: 'requestCallback', type: 'link', name: 'Request Callback', icon: 'call' },
    { state: 'userData', type: 'link', name: 'Merchants', icon: 'person' },
    { state: 'walletTopUp', type: 'link', name: 'Wallet Top-Up', icon: 'account_balance_wallet' },
    { state: 'transactionReversal', type: 'link', name: 'Transaction Reversal', icon: 'reply' },
    {
        state: '', type: 'submenu', name: 'Manage Device', icon: 'devices_other',
        childMenu: [
            { state: 'deRegisterDevice', type: 'link', name: 'De-Register Device', icon: 'chevron_right' },
            { state: 'invalidRegisterDeviceHistory', type: 'link', name: 'Invalid Reg Device', icon: 'chevron_right' }
        ]
    },
    {
        state: '', type: 'submenu', name: 'Razor Pay', icon: 'payment',
        childMenu: [
            { state: 'razorpayTopup', type: 'link', name: 'Razor Pay Top-Up', icon: 'chevron_right' },
            { state: 'razorpayCharges', type: 'link', name: 'Razor Pay Charges', icon: 'chevron_right' }
        ]
    },
    {
        state: '', type: 'submenu', name: 'Broadcast', icon: 'message',
        childMenu: [
            { state: 'broadcastMessage', type: 'link', name: 'Message', icon: 'chevron_right' },
            //{ state: 'broadcastNotice', type: 'link', name: 'Notice', icon: 'chevron_right' }
        ]
    },
    {
        state: '', type: 'submenu', name: 'Settings', icon: 'settings',
        childMenu: [
            { state: 'updateMasters', type: 'link', name: 'Update Masters', icon: 'chevron_right' },
            { state: 'serviceSetting', type: 'link', name: 'Service Setting', icon: 'chevron_right' }
        ]
    }
    //{ state: 'broadcastMessage', type: 'link', name: 'Broadcast Message', icon: 'message' },
    //{ state: 'broadcastNotice', type: 'link', name: 'Broadcast Notice', icon: 'developer_board' }
];

@Injectable()
export class Menuitems {
    getMenuitem(): Menu[] {
        return menuList;
    }
}
