using Microsoft.EntityFrameworkCore.Migrations;

namespace JobProcessing.Infrastructure.Migrations
{
    public partial class AddHighlightedDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HighlightedDescription",
                schema: "Job",
                table: "Jobs",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighlightedDescription",
                schema: "Job",
                table: "Jobs");
        }
    }
}
