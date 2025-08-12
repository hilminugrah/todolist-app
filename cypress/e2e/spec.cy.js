describe('Todo App E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
    // Pastikan halaman dan input muncul sebelum mulai
    cy.get('input[placeholder="Tambah tugas baru"]').should('be.visible');
  });

  it('Menambahkan todo baru', () => {
    cy.get('input[placeholder="Tambah tugas baru"]').type('Belajar Cypress');
    cy.contains('button', 'Tambah').click();

    // Tunggu elemen li muncul, dengan timeout lebih panjang
    cy.contains('li', 'Belajar Cypress', { timeout: 6000 }).should('be.visible');
  });

  it('Menandai todo sebagai selesai', () => {
    cy.get('input[placeholder="Tambah tugas baru"]').type('Tandai selesai');
    cy.contains('button', 'Tambah').click();

    cy.contains('li', 'Tandai selesai', { timeout: 6000 })
      .should('be.visible')
      .find('input[type="checkbox"]')
      .check({ force: true });

    // Cek class setelah checkbox dicentang (pastikan sesuai style kamu)
    cy.contains('li', 'Tandai selesai').should('have.class', 'bg-gray-300');
  });

  it('Menghapus todo', () => {
    cy.get('input[placeholder="Tambah tugas baru"]').type('Hapus saya');
    cy.contains('button', 'Tambah').click();

    cy.contains('li', 'Hapus saya', { timeout: 6000 })
      .should('be.visible')
      .find('button')
      .click();

    cy.contains('li', 'Hapus saya').should('not.exist');
  });
});
