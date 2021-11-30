using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace JobProcessing.Infrastructure.Migrations
{
    public partial class addJobDocumentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.CreateTable(
                name: "JobDocument",
                schema: "Job",
                columns: table => new
                {
                    DocumentId = table.Column<Guid>(type: "uuid", nullable: false),
                    DocumentFileName = table.Column<string>(type: "text", nullable: true),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    JobId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobDocument", x => x.DocumentId);
                    table.ForeignKey(
                        name: "FK_JobDocument_Jobs_JobId",
                        column: x => x.JobId,
                        principalSchema: "Job",
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobDocument_JobId",
                schema: "Job",
                table: "JobDocument",
                column: "JobId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobDocument",
                schema: "Job");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
