export type HttpMethod = 'GET' | 'POST' | 'PUT';

export type Endpoint = {
  name: string;
  method: HttpMethod;
  path: string;
  description: string;
};

export type EndpointGroup = {
  id: string;
  title: string;
  summary: string;
  endpoints: Endpoint[];
};

export const quickSteps = [
  {
    title: 'Receive credentials',
    copy: 'NexaVault provides an API key, sign key, merchant identifier, and optional webhook secret after onboarding.',
  },
  {
    title: 'Implement request signing',
    copy: 'All server calls include timestamp, nonce, request body hash, and an HMAC-SHA256 signature.',
  },
  {
    title: 'Configure wallet capabilities',
    copy: 'Open deposit and withdrawal networks, set fees, configure risk controls, and register collection targets.',
  },
  {
    title: 'Run wallet flows',
    copy: 'Create user profiles, generate deposit addresses, submit withdrawals, receive webhooks, and reconcile flows.',
  },
];

export const environmentRows = [
  { label: 'API host placeholder', value: 'https://{API_HOST}' },
];

export const headerRows = [
  { name: 'X-Api-Key', required: 'Required', description: 'API key assigned by NexaVault.' },
  { name: 'X-Timestamp', required: 'Required', description: 'Unix timestamp in seconds. Clock skew must stay within 300 seconds.' },
  { name: 'X-Nonce', required: 'Required', description: 'Random string. UUID is recommended.' },
  { name: 'X-Signature', required: 'Required', description: 'HMAC-SHA256 request signature.' },
  { name: 'X-Idempotency-Key', required: 'Write APIs', description: 'Required for POST, PUT, and PATCH requests.' },
  { name: 'Content-Type', required: 'Required', description: 'Use application/json for JSON endpoints.' },
];

export const endpointGroups: EndpointGroup[] = [
  {
    id: 'merchant-config',
    title: 'Merchant Configuration',
    summary: 'Configure available networks, fees, risk controls, wallets, collection targets, and webhook delivery.',
    endpoints: [
      { name: 'List supported networks', method: 'GET', path: '/openapi/v1/wallet/networks', description: 'Query chains and assets available for merchant integration.' },
      { name: 'Configure deposit assets', method: 'PUT', path: '/openapi/v1/wallet/configs/deposit-assets', description: 'Open or close deposit capability by chain and asset.' },
      { name: 'List deposit asset config', method: 'GET', path: '/openapi/v1/wallet/configs/deposit-assets', description: 'Read current deposit asset availability.' },
      { name: 'Configure withdrawal assets', method: 'PUT', path: '/openapi/v1/wallet/configs/withdraw-assets', description: 'Open or close withdrawal capability by chain and asset.' },
      { name: 'List withdrawal asset config', method: 'GET', path: '/openapi/v1/wallet/configs/withdraw-assets', description: 'Read current withdrawal asset availability.' },
      { name: 'Configure deposit fees', method: 'PUT', path: '/openapi/v1/wallet/deposit-fee-configs', description: 'Set deposit fee policy for a chain and asset.' },
      { name: 'List deposit fees', method: 'GET', path: '/openapi/v1/wallet/deposit-fee-configs', description: 'Query deposit fee configuration.' },
      { name: 'Configure withdrawal risk', method: 'PUT', path: '/openapi/v1/wallet/withdrawal-risk-configs', description: 'Set withdrawal limits, fees, cooldowns, and approval requirements.' },
      { name: 'List withdrawal risk config', method: 'GET', path: '/openapi/v1/wallet/withdrawal-risk-configs', description: 'Query withdrawal risk controls.' },
      { name: 'Create hot wallet', method: 'POST', path: '/openapi/v1/wallet/hot-wallets', description: 'Create a merchant hot wallet for withdrawals or gas.' },
      { name: 'List hot wallets', method: 'GET', path: '/openapi/v1/wallet/hot-wallets', description: 'Query hot wallet usage, support scope, status, and balances.' },
      { name: 'Update hot wallet', method: 'PUT', path: '/openapi/v1/wallet/hot-wallets/{hot_wallet_id}', description: 'Update wallet purpose, supported chains, supported assets, and status.' },
      { name: 'Create cold wallet', method: 'POST', path: '/openapi/v1/wallet/cold-wallets', description: 'Register a merchant cold wallet address.' },
      { name: 'List cold wallets', method: 'GET', path: '/openapi/v1/wallet/cold-wallets', description: 'Query registered cold wallets.' },
      { name: 'Configure collection target', method: 'PUT', path: '/openapi/v1/wallet/collection-targets', description: 'Set the active cold wallet target for a chain and asset.' },
      { name: 'List collection targets', method: 'GET', path: '/openapi/v1/wallet/collection-targets', description: 'Query current collection target mappings.' },
      { name: 'Configure webhook', method: 'PUT', path: '/openapi/v1/wallet/webhook/config', description: 'Set callback URL and subscribed wallet events.' },
      { name: 'Get webhook config', method: 'GET', path: '/openapi/v1/wallet/webhook/config', description: 'Read the current webhook configuration.' },
    ],
  },
  {
    id: 'runtime-wallet',
    title: 'Runtime Wallet APIs',
    summary: 'Create wallet users, generate deposit addresses, validate addresses, submit withdrawals, and reconcile account activity.',
    endpoints: [
      { name: 'Create wallet user', method: 'POST', path: '/openapi/v1/wallet/users', description: 'Create or reuse a wallet user profile for a merchant user.' },
      { name: 'Get wallet user', method: 'GET', path: '/openapi/v1/wallet/users/{merchant_user_id}', description: 'Query user profile and wallet status.' },
      { name: 'Generate deposit address', method: 'POST', path: '/openapi/v1/wallet/addresses', description: 'Generate a deposit address for a user and chain network.' },
      { name: 'Get deposit address', method: 'GET', path: '/openapi/v1/wallet/addresses', description: 'Query an existing user deposit address.' },
      { name: 'Get or create address', method: 'POST', path: '/openapi/v1/wallet/addresses/get-or-create', description: 'Return an existing address or create it when missing.' },
      { name: 'Validate address', method: 'POST', path: '/openapi/v1/wallet/address-validations', description: 'Validate on-chain address format.' },
      { name: 'List fund accounts', method: 'GET', path: '/openapi/v1/wallet/fund-accounts', description: 'Query user balances, frozen balances, and available balances.' },
      { name: 'List deposits', method: 'GET', path: '/openapi/v1/wallet/deposits', description: 'Query on-chain deposit records and accounting results.' },
      { name: 'Preview withdrawal', method: 'POST', path: '/openapi/v1/wallet/withdrawals/preview', description: 'Estimate fee, net amount, frozen amount, and submission eligibility.' },
      { name: 'Create withdrawal', method: 'POST', path: '/openapi/v1/wallet/withdrawals', description: 'Create a withdrawal request.' },
      { name: 'List withdrawals', method: 'GET', path: '/openapi/v1/wallet/withdrawals', description: 'Query withdrawal status and final result.' },
      { name: 'List fund flows', method: 'GET', path: '/openapi/v1/wallet/fund-flows', description: 'Query balance ledger movements for reconciliation and display.' },
      { name: 'Get fund flow stats', method: 'GET', path: '/openapi/v1/wallet/fund-flows/stats', description: 'Aggregate user fund-flow statistics by filters.' },
      { name: 'List collections', method: 'GET', path: '/openapi/v1/wallet/collections', description: 'Query merchant-level collection records for operations and finance.' },
    ],
  },
  {
    id: 'consume-payments',
    title: 'Consumer Payment APIs',
    summary: 'Support wallet-balance checkout, payment password verification, merchant account reconciliation, order closing, and refunds.',
    endpoints: [
      { name: 'List merchant accounts', method: 'GET', path: '/openapi/v1/wallet/merchant-accounts', description: 'Query merchant wallet balances by asset.' },
      { name: 'List merchant account flows', method: 'GET', path: '/openapi/v1/wallet/merchant-account-flows', description: 'Query merchant collection, refund, and adjustment ledger flows.' },
      { name: 'Get payment password status', method: 'GET', path: '/openapi/v1/wallet/payment-password/status', description: 'Check whether a user has set a payment password.' },
      { name: 'Send setup code', method: 'POST', path: '/openapi/v1/wallet/payment-password/setup/send-code', description: 'Send a setup verification code to a user security channel.' },
      { name: 'Verify setup code', method: 'POST', path: '/openapi/v1/wallet/payment-password/setup/verify-code', description: 'Verify setup code and issue a setup ticket.' },
      { name: 'Set payment password', method: 'POST', path: '/openapi/v1/wallet/payment-password/setup', description: 'Complete initial payment password setup.' },
      { name: 'Change payment password', method: 'POST', path: '/openapi/v1/wallet/payment-password/change', description: 'Update a known payment password.' },
      { name: 'Send reset code', method: 'POST', path: '/openapi/v1/wallet/payment-password/reset/send-code', description: 'Send a reset verification code.' },
      { name: 'Verify reset code', method: 'POST', path: '/openapi/v1/wallet/payment-password/reset/verify-code', description: 'Verify reset code and issue a reset ticket.' },
      { name: 'Reset payment password', method: 'POST', path: '/openapi/v1/wallet/payment-password/reset', description: 'Reset a forgotten payment password.' },
      { name: 'Verify payment password', method: 'POST', path: '/openapi/v1/wallet/payment-password/verify', description: 'Issue a one-time payment token for a wallet checkout.' },
      { name: 'Create consume order', method: 'POST', path: '/openapi/v1/wallet/consume-orders', description: 'Create a wallet-balance payment order.' },
      { name: 'Get consume order', method: 'GET', path: '/openapi/v1/wallet/consume-orders/{merchant_order_id}', description: 'Query one payment order.' },
      { name: 'List consume orders', method: 'GET', path: '/openapi/v1/wallet/consume-orders', description: 'Query payment orders by user, status, asset, and time.' },
      { name: 'Preview consume payment', method: 'POST', path: '/openapi/v1/wallet/consume-orders/preview', description: 'Validate order amount, user balance, and payment eligibility.' },
      { name: 'Pay consume order', method: 'POST', path: '/openapi/v1/wallet/consume-orders/{merchant_order_id}/pay', description: 'Execute wallet-balance payment.' },
      { name: 'Close consume order', method: 'POST', path: '/openapi/v1/wallet/consume-orders/{merchant_order_id}/close', description: 'Close an unpaid order.' },
      { name: 'Create refund', method: 'POST', path: '/openapi/v1/wallet/consume-orders/{merchant_order_id}/refunds', description: 'Create a full or partial refund.' },
      { name: 'Get refund', method: 'GET', path: '/openapi/v1/wallet/refunds/{merchant_refund_id}', description: 'Query one refund.' },
      { name: 'List refunds', method: 'GET', path: '/openapi/v1/wallet/refunds', description: 'Query refunds by order, status, and time.' },
    ],
  },
];

export const walletEvents = [
  { name: 'wallet.deposit.confirmed', description: 'Deposit reached confirmation threshold and was credited.' },
  { name: 'wallet.withdrawal.pending_review', description: 'Withdrawal request is waiting for manual review.' },
  { name: 'wallet.withdrawal.processing', description: 'Withdrawal entered chain processing.' },
  { name: 'wallet.withdrawal.succeeded', description: 'Withdrawal succeeded on-chain.' },
  { name: 'wallet.withdrawal.failed', description: 'Withdrawal failed and funds were rolled back or released.' },
  { name: 'wallet.collection.completed', description: 'Collection completed.' },
  { name: 'wallet.collection.failed', description: 'Collection failed.' },
  { name: 'wallet.consume.paid', description: 'Consumer order was paid successfully.' },
  { name: 'wallet.consume.refunded', description: 'Consumer order refund succeeded.' },
  { name: 'wallet.account.balance.changed', description: 'User fund account balance changed after payment or refund.' },
];

export const statusGroups = [
  {
    title: 'Deposit',
    statuses: [
      ['pending', 'Observed on-chain and waiting for confirmations.'],
      ['confirmed', 'Confirmed and credited.'],
      ['failed', 'Credit failed.'],
      ['cancelled', 'Cancelled.'],
    ],
  },
  {
    title: 'Withdrawal',
    statuses: [
      ['pending_review', 'Waiting for review.'],
      ['processing', 'Processing on-chain.'],
      ['succeeded', 'Succeeded on-chain.'],
      ['failed', 'Failed on-chain.'],
      ['cancelled', 'Cancelled.'],
    ],
  },
  {
    title: 'Consume Order',
    statuses: [
      ['CREATED', 'Created and waiting for payment.'],
      ['PAYING', 'Payment processing.'],
      ['PAID', 'Paid successfully.'],
      ['FAILED', 'Payment failed.'],
      ['CLOSED', 'Closed before payment.'],
      ['REFUNDED', 'Fully refunded.'],
    ],
  },
];

export const errorRows = [
  ['400', 'XFW400001', 'Invalid request'],
  ['400', 'XFW400002', 'Invalid parameter field(s)'],
  ['401', 'XFW401001', 'Unauthorized'],
  ['401', 'XFW401002', 'Invalid signature'],
  ['403', 'XFW403001', 'Permission denied'],
  ['404', 'XFW404001', 'Resource not found'],
  ['409', 'XFW409001', 'Duplicated request'],
  ['422', 'XFW422001', 'Business rule rejected'],
  ['429', 'XFW429001', 'Rate limit exceeded'],
  ['500', 'XFW500000', 'Internal server error'],
];

export const signingExample = `{timestamp}.{nonce}.{method}.{path}.{body_sha256}

HMAC-SHA256(signing_string, sign_key)`;

export const curlExample = `curl -X POST "https://{API_HOST}/openapi/v1/wallet/consume-orders" \\
  -H "Content-Type: application/json" \\
  -H "X-Api-Key: \${API_KEY}" \\
  -H "X-Timestamp: 1778745600" \\
  -H "X-Nonce: 2f7b0f9b-5f7e-4d63-b39a-4cce7a9c0012" \\
  -H "X-Idempotency-Key: idem_consume_create_202605130001" \\
  -H "X-Signature: \${SIGNATURE}" \\
  -d '{
    "merchant_order_id": "consume_order_202605130001",
    "merchant_user_id": "user_10001",
    "symbol": "USDT",
    "order_amount": "25.000000",
    "subject": "Membership order",
    "description": "Monthly membership",
    "metadata": {
      "merchant_product_id": "membership_monthly"
    }
  }'`;

export const responseExample = `{
  "request_id": "req_wallet_180812",
  "data": {
    "merchant_order_id": "consume_order_202605130001",
    "merchant_user_id": "user_10001",
    "symbol": "USDT",
    "order_amount": "25.000000",
    "paid_amount": "0.000000",
    "refunded_amount": "0.000000",
    "remaining_refundable_amount": "0.000000",
    "status": "CREATED",
    "created_at": "2026-05-13T10:00:00Z"
  }
}`;
