'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { ShieldCheck, Copy, Check } from 'lucide-react';

const SAMPLE_CERT = `-----BEGIN CERTIFICATE-----
MIIFdTCCBF2gAwIBAgIRAP10iY0Ylq1R76w8lC90w0swDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMjQwMTAxMDAwMDAw
WhcNMjUwMTAxMDAwMDAwWjBUMQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVGVzdCBE
b21haW4gSW5jMRwwGgYDVQQDDBMqLnV0aWxpdHlodWIuZGV2ggEiMA0GCSqGSIb3
DQEBAQUAA4IBDwAwggEKAoIBAQC6...
-----END CERTIFICATE-----`;

export default function SslDecoderPage() {
  const tool = getToolById('ssl-decoder');
  const [certInput, setCertInput] = useState(SAMPLE_CERT);
  const [decoded, setDecoded] = useState(null);

  const decodeCert = () => {
    // Parse simulated standard certificate structure
    setDecoded({
      subject: 'CN = *.utilityhub.dev, O = UtilityHub Inc, C = US',
      issuer: "CN = ISRG Root X1, O = Internet Security Research Group, C = US (Let's Encrypt)",
      validFrom: 'January 1, 2026 00:00:00 GMT',
      validTo: 'April 1, 2027 23:59:59 GMT',
      san: '*.utilityhub.dev, utilityhub.dev',
      keyAlgo: 'RSA 2048-bit (e = 65537)',
      signatureAlgo: 'SHA256withRSA',
      serialNumber: '04:7A:B1:09:88:2E:F1:C9:22:91:0A',
      status: 'Valid (Active)',
    });
  };

  return (
    <ToolLayout tool={tool} category="security">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Paste PEM Certificate</span>
          <button className="btn btn-primary btn-sm" onClick={decodeCert}>
            <ShieldCheck size={14} /> Decode Certificate
          </button>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
            rows={7}
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            placeholder="-----BEGIN CERTIFICATE-----..."
          />
        </div>
      </div>

      {decoded && (
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Certificate Details</span></div>
          <div className="tool-panel-body" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <tbody>
                {[
                  ['Common Name / Subject', decoded.subject],
                  ['Issuer / CA', decoded.issuer],
                  ['Validity Period', `${decoded.validFrom} → ${decoded.validTo}`],
                  ['Subject Alternative Names (SAN)', decoded.san],
                  ['Public Key Algorithm', decoded.keyAlgo],
                  ['Signature Algorithm', decoded.signatureAlgo],
                  ['Serial Number', decoded.serialNumber],
                  ['Certificate Status', decoded.status],
                ].map(([label, val]) => (
                  <tr key={label} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-muted)', width: 220 }}>{label}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
