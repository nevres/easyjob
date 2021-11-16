using Microsoft.EntityFrameworkCore.Migrations;

namespace JobProcessing.Infrastructure.Migrations
{
    public partial class addEmployer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployerId",
                schema: "Job",
                table: "Jobs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Employer",
                schema: "Job",
                columns: table => new
                {
                    Identity = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employer", x => x.Identity);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_EmployerId",
                schema: "Job",
                table: "Jobs",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Employer_EmployerId",
                schema: "Job",
                table: "Jobs",
                column: "EmployerId",
                principalSchema: "Job",
                principalTable: "Employer",
                principalColumn: "Identity",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Employer_EmployerId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropTable(
                name: "Employer",
                schema: "Job");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_EmployerId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                schema: "Job",
                table: "Jobs");
        }
    }
}
