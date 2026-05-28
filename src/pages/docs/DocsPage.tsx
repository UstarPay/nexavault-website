import { useEffect } from 'react';
import {
  curlExample,
  endpointGroups,
  environmentRows,
  errorRows,
  headerRows,
  responseExample,
  signingExample,
  statusGroups,
  walletEvents,
  type Endpoint,
} from './apiDocsData';

const bodyParams = [
  {
    name: 'merchant_order_id',
    type: 'string',
    required: true,
    description: 'Merchant order number. It must be unique under the same merchant.',
  },
  {
    name: 'merchant_user_id',
    type: 'string',
    required: true,
    description: 'Unique user identifier from the merchant system.',
  },
  {
    name: 'symbol',
    type: 'string',
    required: true,
    description: 'Order asset symbol.',
  },
  {
    name: 'order_amount',
    type: 'string',
    required: true,
    description: 'Order payable amount.',
  },
  {
    name: 'subject',
    type: 'string',
    required: true,
    description: 'Order title.',
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: 'Order description.',
  },
  {
    name: 'metadata',
    type: 'object',
    required: false,
    description: 'Merchant extension fields.',
  },
];

const responseFields = [
  ['merchant_order_id', 'string', 'Merchant order number.'],
  ['merchant_user_id', 'string', 'Unique user identifier from the merchant system.'],
  ['symbol', 'string', 'Order asset symbol.'],
  ['order_amount', 'string', 'Order amount.'],
  ['paid_amount', 'string', 'Actual paid amount.'],
  ['refunded_amount', 'string', 'Accumulated refunded amount.'],
  ['remaining_refundable_amount', 'string', 'Remaining refundable amount.'],
  ['status', 'string', 'Order status.'],
  ['created_at', 'string', 'Creation time.'],
];

function MethodBadge({ method }: { method: Endpoint['method'] }) {
  return <span className={`docs-method docs-method-${method.toLowerCase()}`}>{method}</span>;
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="docs-code-card">
      <div className="docs-code-head">
        <span>{label}</span>
        <span>Example</span>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function EndpointRow({ endpoint }: { endpoint: Endpoint }) {
  return (
    <article className="endpoint-row">
      <div className="endpoint-main">
        <MethodBadge method={endpoint.method} />
        <code>{endpoint.path}</code>
      </div>
      <div>
        <h3>{endpoint.name}</h3>
        <p>{endpoint.description}</p>
      </div>
    </article>
  );
}

const DocsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="docs-page">
      <div className="docs-product-nav">
        <div className="shell docs-product-nav-inner">
          <a href="/docs" className="docs-version-select">
            v1 Wallet
          </a>
          <a href="#overview">Guides</a>
          <a className="is-active" href="#authentication">
            API Reference
          </a>
          <a href="#webhooks">Webhooks</a>
        </div>
      </div>

      <div className="docs-reference-shell shell">
        <aside className="docs-left-rail" aria-label="Documentation navigation">
          <div className="docs-jump-box">Jump to</div>
          <nav className="docs-sidebar">
            <p>Getting Started</p>
            <a href="#overview">Overview</a>
            <a href="#environments">Environments</a>
            <a href="#authentication">Authentication</a>
            <a href="#request-format">Request and response</a>
            <a href="#errors">Errors</a>
            <p>Wallet APIs</p>
            {endpointGroups.map((group) => (
              <a href={`#${group.id}`} key={group.id}>
                {group.title}
                <span>{group.endpoints.length}</span>
              </a>
            ))}
            <p>Current endpoint</p>
            <a className="is-current" href="#overview">
              Create consume order
              <MethodBadge method="POST" />
            </a>
            <a href="#webhooks">Webhook events</a>
            <a href="#statuses">Statuses</a>
          </nav>
        </aside>

        <article className="docs-article">
          <header className="docs-article-head" id="overview">
            <div className="docs-title-row">
              <div>
                <span className="docs-kicker">API Reference</span>
                <h1>Create consume order</h1>
              </div>
            </div>
            <div className="docs-endpoint-line">
              <MethodBadge method="POST" />
              <code>https://{'{API_HOST}'}/openapi/v1/wallet/consume-orders</code>
            </div>
            <p>
              Create a pending consume order for wallet-balance checkout. The request fields, response fields,
              curl command, and JSON response on this page are taken from the wallet OpenAPI source document.
            </p>
          </header>

          <section className="docs-content-section" id="environments">
            <h2>Environments</h2>
            <p>
              The public reference uses the host placeholder from the source document:
              <code> https://{'{API_HOST}'}</code>.
            </p>
            <div className="docs-compact-table">
              {environmentRows.map((row) => (
                <div key={row.label}>
                  <span>{row.label}</span>
                  <code>{row.value}</code>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-content-section" id="authentication">
            <h2>Authentication</h2>
            <p>
              Every request is signed with API key headers plus a timestamp, nonce, HTTP method, URL path,
              and raw body hash. Write APIs also require an idempotency key.
            </p>
            <h3>Headers</h3>
            <div className="docs-param-table">
              {headerRows.map((row) => (
                <div key={row.name}>
                  <code>{row.name}</code>
                  <span>{row.required}</span>
                  <p>{row.description}</p>
                </div>
              ))}
            </div>
            <h3>Signing string</h3>
            <CodeBlock label="HMAC-SHA256" code={signingExample} />
          </section>

          <section className="docs-content-section" id="request-format">
            <h2>Create consume order</h2>
            <p>
              Use this endpoint to create a payable order before previewing, paying, closing, or refunding a
              wallet-balance transaction.
            </p>
            <h3>Body Params</h3>
            <div className="docs-param-table">
              {bodyParams.map((row) => (
                <div key={row.name}>
                  <code>{row.name}</code>
                  <span>
                    {row.type}
                    {row.required ? ' required' : ''}
                  </span>
                  <p>{row.description}</p>
                </div>
              ))}
            </div>
            <h3>Response fields</h3>
            <div className="docs-param-table">
              {responseFields.map(([name, type, description]) => (
                <div key={name}>
                  <code>{name}</code>
                  <span>{type}</span>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-content-section" id="api-reference">
            <h2>Endpoint catalog</h2>
            <p>
              The catalog is grouped by integration job so implementation teams can move from onboarding
              configuration to runtime wallet operations and payment flows.
            </p>
            <div className="docs-endpoint-groups">
              {endpointGroups.map((group) => (
                <section className="endpoint-group" id={group.id} key={group.id}>
                  <div className="endpoint-group-head">
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                  </div>
                  <div className="endpoint-list">
                    {group.endpoints.map((endpoint) => (
                      <EndpointRow endpoint={endpoint} key={`${endpoint.method}-${endpoint.path}`} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="docs-content-section" id="webhooks">
            <h2>Webhook events</h2>
            <p>
              Return HTTP 200 after receiving an event and process every <code>event_id</code> idempotently.
            </p>
            <div className="docs-event-list">
              {walletEvents.map((event) => (
                <article key={event.name}>
                  <code>{event.name}</code>
                  <p>{event.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="docs-content-section" id="statuses">
            <h2>Status values</h2>
            <div className="docs-status-stack">
              {statusGroups.map((group) => (
                <article className="docs-status-card" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.statuses.map(([status, description]) => (
                    <div key={status}>
                      <code>{status}</code>
                      <span>{description}</span>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section className="docs-content-section" id="errors">
            <h2>Errors</h2>
            <div className="docs-error-list">
              {errorRows.map(([status, code, message]) => (
                <div key={code}>
                  <span>{status}</span>
                  <code>{code}</code>
                  <p>{message}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="docs-right-rail" aria-label="API examples">
          <CodeBlock label="Bash request" code={curlExample} />
          <CodeBlock label="200 response" code={responseExample} />
        </aside>
      </div>
    </div>
  );
};

export default DocsPage;
