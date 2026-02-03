import { docsConfig as docsConfigEn, frameworkOptions as frameworkOptionsEn } from './docs-en';
import { docsConfig as docsConfigPt, frameworkOptions as frameworkOptionsPt } from './docs-pt';

export function getDocsConfig(lang: string) {
  return lang === 'pt' ? docsConfigPt : docsConfigEn;
}

export function getFrameworkOptions(lang: string) {
  return lang === 'pt' ? frameworkOptionsPt : frameworkOptionsEn;
}

export { docsConfigEn, docsConfigPt, frameworkOptionsEn, frameworkOptionsPt };
