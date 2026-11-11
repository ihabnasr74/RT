import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PORTFOLIO_CONTENT,
  computeScrollProgress,
  computeLogoDockState,
  computeParallaxOffset,
} from './portfolioContent';

test('PORTFOLIO_CONTENT preserves exact verbatim text and section order', () => {
  assert.equal(PORTFOLIO_CONTENT.logoPath, './logo.png');
  assert.equal(PORTFOLIO_CONTENT.header.ar, 'رواد التميّز لخدمات الترجمة');
  assert.equal(PORTFOLIO_CONTENT.header.enLine1, 'Rowad Al Tamayuz');
  assert.equal(PORTFOLIO_CONTENT.header.enLine2, 'Translation Services');

  // Section 1: Company Profile
  assert.equal(PORTFOLIO_CONTENT.companyProfile.heading.en, 'Company Profile');
  assert.equal(PORTFOLIO_CONTENT.companyProfile.heading.ar, 'الملف التعريفي');
  assert.equal(PORTFOLIO_CONTENT.companyProfile.paragraphsAr.length, 2);
  assert.equal(PORTFOLIO_CONTENT.companyProfile.paragraphsEn.length, 2);

  // Section 2: Our Core Values
  assert.equal(PORTFOLIO_CONTENT.coreValues.heading.en, 'Our Core Values');
  assert.equal(PORTFOLIO_CONTENT.coreValues.heading.ar, 'قيَمنا الجوهرية');
  assert.equal(PORTFOLIO_CONTENT.coreValues.items.length, 4);

  // Section 3: Our Specialized Services
  assert.equal(PORTFOLIO_CONTENT.specializedServices.heading.en, 'Our Specialized Services');
  assert.equal(PORTFOLIO_CONTENT.specializedServices.group1.itemsEn.length, 4);
  assert.equal(PORTFOLIO_CONTENT.specializedServices.group2.itemsEn.length, 10);
  assert.equal(PORTFOLIO_CONTENT.specializedServices.group2.itemsAr.length, 10);
  assert.ok(
    PORTFOLIO_CONTENT.specializedServices.group2.itemsEn.includes('Degree Recognition Serviced')
  );

  // Section 4: Transactions Processing
  assert.equal(PORTFOLIO_CONTENT.transactionsProcessing.heading.en, 'Transactions Processing');
  assert.equal(PORTFOLIO_CONTENT.transactionsProcessing.heading.ar, 'تخليص المعاملات');

  // Section 5: Translation Request Process
  assert.equal(PORTFOLIO_CONTENT.serviceRequestProcess.heading.ar, 'إجراءات طلب الترجمة');
  assert.equal(
    PORTFOLIO_CONTENT.serviceRequestProcess.heading.en,
    'Translation Request Process'
  );
  assert.equal(PORTFOLIO_CONTENT.serviceRequestProcess.steps.length, 6);
  assert.deepEqual(
    PORTFOLIO_CONTENT.serviceRequestProcess.steps.map((s) => s.number),
    [1, 2, 3, 4, 5, 6]
  );

  // Section 6: Communication Channels
  assert.equal(PORTFOLIO_CONTENT.communicationChannels.channels.length, 3);
  assert.equal(PORTFOLIO_CONTENT.communicationChannels.channels[0].value, 'Sami.legal@outlook.com');
  assert.equal(PORTFOLIO_CONTENT.communicationChannels.channels[1].value, '+971 50 509 5759');
  assert.equal(PORTFOLIO_CONTENT.communicationChannels.channels[2].value, '+971 50 509 5759');
});

test('Scroll progress and logo docking math behave deterministically', () => {
  assert.equal(computeScrollProgress(0, 1000), 0);
  assert.equal(computeScrollProgress(500, 1000), 0.5);
  assert.equal(computeScrollProgress(1200, 1000), 1);

  const startDock = computeLogoDockState(0, 240);
  assert.equal(startDock.progress, 0);
  assert.equal(startDock.isDocked, false);
  assert.equal(startDock.scale, 1);

  const endDock = computeLogoDockState(240, 240);
  assert.equal(endDock.progress, 1);
  assert.equal(endDock.isDocked, true);
  assert.ok(endDock.scale < 0.5);
});

test('Parallax offset respects reduced motion and mobile scaling', () => {
  assert.equal(computeParallaxOffset(200, 0.2, 1440, true), 0);
  const desktopOffset = computeParallaxOffset(200, 0.2, 1440, false);
  const mobileOffset = computeParallaxOffset(200, 0.2, 375, false);
  assert.equal(desktopOffset, 40);
  assert.equal(mobileOffset, 14);
});
