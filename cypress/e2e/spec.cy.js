describe('Todo App E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/'); 
  });

  it('Menambahkan todo baru', () => {
    cy.get('input[placeholder="Tambah tugas baru"]').type('Belajar Cypress');
    cy.contains('button', 'Tambah').click();
    cy.contains('li', 'Belajar Cypress').should('be.visible');
  });

  it('Menandai todo sebagai selesai', () => {
    cy.get('input[placeholder="Tambah tugas baru"]').type('Tandai selesai');
    cy.contains('button', 'Tambah').click();

    cy.contains('li', 'Tandai selesai')
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.contains('li', 'Tandai selesai')
      .should('have.class', 'bg-gray-300');
  });

  it('Menghapus todo', () => {
    cy.get('input[placeholder="Tambah tugas baru"]').type('Hapus saya');
    cy.contains('button', 'Tambah').click();

    cy.contains('li', 'Hapus saya')
      .find('button')
      .click();

    cy.contains('Hapus saya').should('not.exist');
  });
});
