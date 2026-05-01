<p align="center">
  <img src="https://raw.githubusercontent.com/Stirling-Tools/Stirling-PDF/main/docs/stirling.png" width="80" alt="Stirling PDF logo">
</p>

<h1 align="center">Stirling PDF - Standalone Desktop Fork</h1>

> **This is a personal fork of [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)**, customized for standalone desktop deployment.
>
> Based on upstream commit [`890cf16`](https://github.com/Stirling-Tools/Stirling-PDF/commit/890cf16f7) (main branch).

## Changes from Upstream

| Area | Change | Details |
|------|--------|---------|
| **Telemetry** | Removed PostHog, Scarf, and analytics tracking | Stripped from frontend core components; engine telemetry left intact to comply with Stirling PDF User License |
| **Desktop hardening** | Stripped SaaS credentials and hardened config | Removed default SaaS URLs, disabled unused features via backend `-D` flags |
| **UI cleanup** | Removed external links | Footer and UI links to external services removed for air-gapped deployment |
| **Form field editing** | Added PDF form field creation/editing | New form field overlay with zh-TW i18n support |
| **macOS build** | Unsigned build support | Ad-hoc signing identity for macOS builds without Apple Developer certificate |

> **License note:** Files under `frontend/src/desktop/`, `frontend/src/proprietary/`, `frontend/src/saas/`, `app/proprietary/`, and `engine/` are governed by the [Stirling PDF User License](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/app/proprietary/LICENSE) and have not been modified in this fork (or were reverted to upstream).

---

Stirling PDF is a powerful, open-source PDF editing platform. Run it as a personal desktop app, in the browser, or deploy it on your own servers with a private API. Edit, sign, redact, convert, and automate PDFs without sending documents to external services.

<p align="center">
  <a href="https://github.com/Stirling-Tools/stirling-pdf">
    <img src="https://img.shields.io/github/stars/stirling-tools/stirling-pdf?style=social" alt="Upstream GitHub Stars">
  </a>
</p>

![Stirling PDF - Dashboard](images/home-light.png)

## Key Capabilities

- **Everywhere you work** - Desktop client, browser UI, and self-hosted server with a private API.
- **50+ PDF tools** - Edit, merge, split, sign, redact, convert, OCR, compress, and more.
- **Automation & workflows** - No-code pipelines direct in UI with APIs to process millions of PDFs.
- **Enterprise‑grade** - SSO, auditing, and flexible on‑prem deployments.
- **Developer platform** - REST APIs available for nearly all tools to integrate into your existing systems.
- **Global UI** - Interface available in 40+ languages.

For a full feature list, see the docs: **https://docs.stirlingpdf.com**

## Quick Start

```bash
docker run -p 8080:8080 docker.stirlingpdf.com/stirlingtools/stirling-pdf
```

Then open: http://localhost:8080

For full installation options (including desktop and Kubernetes), see our [Documentation Guide](https://docs.stirlingpdf.com/#documentation-guide).

## Resources

- [**Documentation**](https://docs.stirlingpdf.com)
- [**Homepage**](https://stirling.com)
- [**API Docs**](https://registry.scalar.com/@stirlingpdf/apis/stirling-pdf-processing-api/)
- [**Server Plan & Enterprise**](https://docs.stirlingpdf.com/Paid-Offerings)

## Support

- **Community** [Discord](https://discord.gg/HYmhKj45pU)
- **Bug Reports**: [Github issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

This project uses [Task](https://taskfile.dev/) as a unified command runner for all build, dev, and test commands. Run `task install` to get started, or see the [Developer Guide](DeveloperGuide.md) for full details.

For adding translations, see the [Translation Guide](devGuide/HowToAddNewLanguage.md).

## License

Stirling PDF is open-core. See [LICENSE](LICENSE) for details.
