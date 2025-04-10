// tracing.js
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider();
const exporter = new JaegerExporter({
  serviceName: 'codemaster-service',
  host: 'jaeger-collector'
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
